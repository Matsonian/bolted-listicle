import { GraphQLError } from 'graphql';
import { SermonAgent } from '../agents';
import {
    APP_SECRET,
    signUpOrInWithPasswordHandler,
    ssoLoginHandler,
} from '../auth';
import { Prisma, Sermon } from '@prisma/client';
import { sendOtpEmail, sendWelcomeEmail } from '../email/emailService';
import * as jwt from 'jsonwebtoken';
import { prisma, builder } from '../schemabuilder';
import { AuthPayloadRef, DenominationEnum } from './types';
import { SermonAgentResponse } from '../agents/sermonResponseSchema';

export const UserMutations = builder.mutationType({
    fields: (t) => ({
        sendOtp: t.boolean({
            args: {
                email: t.arg({ type: 'String', required: true }),
            },
            resolve: async (_parent, args) => {
                // Generate a 6-digit numeric OTP code
                const otpCode = Math.floor(
                    100000 + Math.random() * 900000,
                ).toString();

                // Set expiration time (10 minutes from now)
                const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

                // Store the OTP code with the email address and expiration time
                // NOTE: The OTP model may not be available in the current Prisma client
                // This would require regenerating the Prisma client after adding the model
                // For now, we'll comment this out and just send the email

                await prisma.oneTimePassword.create({
                    data: {
                        email: args.email,
                        code: otpCode,
                        expiresAt,
                    },
                });

                console.log(
                    `OTP code ${otpCode} generated for ${args.email} (expires at ${expiresAt})`,
                );

                // Send the OTP via the email service
                try {
                    await sendOtpEmail(args.email, otpCode);
                    return true;
                } catch (error) {
                    console.error('Failed to send OTP email:', error);
                    throw new Error('Failed to send OTP email');
                }
            },
        }),
        signInWithOtp: t.field({
            type: AuthPayloadRef,
            args: {
                otpCode: t.arg.string({ required: true }),
            },
            resolve: async (_parent, args) => {
                // Find the OTP record by code
                const otpRecord = await prisma.oneTimePassword.findFirst({
                    where: {
                        code: args.otpCode,
                    },
                });

                // Check if OTP exists
                if (!otpRecord) {
                    throw new GraphQLError('Invalid OTP code.');
                }

                // Check if OTP has expired
                if (otpRecord.expiresAt < new Date()) {
                    throw new GraphQLError('OTP code has expired.');
                }

                // Check if OTP has already been used
                if (otpRecord.used) {
                    throw new GraphQLError('OTP code has already been used.');
                }

                // Mark OTP as used
                await prisma.oneTimePassword.update({
                    where: {
                        id: otpRecord.id,
                    },
                    data: {
                        used: true,
                    },
                });

                // Find or create user with the email from OTP record
                let user = await prisma.user.findUnique({
                    where: { email: otpRecord.email },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: otpRecord.email,
                            provider: 'otp',
                        },
                    });
                    await sendWelcomeEmail(otpRecord.email);
                }

                // Generate JWT token
                const token = jwt.sign({ userId: user.id }, APP_SECRET!);

                return {
                    token,
                    userId: user.id,
                };
            },
        }),
        signUpOrInWithPassword: t.field({
            type: AuthPayloadRef,
            args: {
                email: t.arg.string({ required: true }),
                password: t.arg.string({ required: true }),
            },
            resolve: async (_parent, args) => {
                return signUpOrInWithPasswordHandler({
                    email: args.email,
                    password: args.password,
                    prisma,
                });
            },
        }),
        ssoLogin: t.field({
            type: AuthPayloadRef,
            args: {
                provider: t.arg.string({ required: true }),
                accessToken: t.arg.string({ required: true }),
            },
            resolve: async (_parent, args) => {
                return ssoLoginHandler({
                    provider: args.provider,
                    accessToken: args.accessToken,
                    prisma,
                });
            },
        }),
        updateUserProfile: t.prismaField({
            type: 'User',
            args: {
                church: t.arg.string(),
                denomination: t.arg({ type: DenominationEnum }),
                firstName: t.arg.string(),
                lastName: t.arg.string(),
            },
            resolve: async (query, _parent, args, ctx) => {
                const reqUser = ctx.user;

                if (!reqUser) {
                    throw new Error(
                        'Reached illegal state: no user in context',
                    );
                }

                const updated = await prisma.user.update({
                    ...query,
                    where: { id: reqUser.id },
                    data: {
                        church: args.church ?? undefined,
                        denomination: args.denomination ?? undefined,
                        firstName: args.firstName ?? undefined,
                        lastName: args.lastName ?? undefined,
                    },
                });

                return updated;
            },
        }),
        updateUser: t.prismaField({
            type: 'User',
            args: {
                church: t.arg.string(),
                denomination: t.arg({ type: DenominationEnum }),
                firstName: t.arg.string(),
                lastName: t.arg.string(),
                address1: t.arg.string(),
                address2: t.arg.string(),
                city: t.arg.string(),
                state: t.arg.string(),
                email: t.arg.string(),
                isOnboarded: t.arg.boolean(),
                otherDenomination: t.arg.string(),
            },
            // updates the contextual user
            resolve: async (query, _parent, args, ctx) => {
                const { isOnboarded, ...rest } = args;
                const updateData: Prisma.UserUpdateInput = {};

                if (isOnboarded) {
                    updateData.isOnboarded = isOnboarded;
                }

                return prisma.user.update({
                    ...query,
                    where: { id: ctx.user?.id },
                    data: {
                        ...rest,
                        ...updateData,
                    },
                });
            },
        }),
    }),
});

export const SermonMutations = builder.mutationType({
    fields: (t) => ({
        generateSermon: t.prismaField({
            type: 'Sermon',
            args: {
                title: t.arg.string({ required: true }),
                pastorName: t.arg.string({
                    required: false,
                    description:
                        "Optional name of the pastor delivering the sermon, defaults to the requestor's name",
                }),
                churchName: t.arg.string({
                    required: false,
                    description:
                        "Optional name of the church where the sermon will be delivered, defaults to the requestor's church",
                }),
                denomination: t.arg({
                    type: DenominationEnum,
                    required: false,
                    description:
                        "Optional denomination of the church, defaults to the requestor's primary denomination",
                }),
                prompt: t.arg.string({
                    required: true,
                    description: `A prompt describing the desired sermon. This should include the scripture passage(s) to be covered, the intended audience, the occasion (if any), and any specific themes or messages to be conveyed. Be as detailed as possible to help guide the sermon generation. Example: "A 20-minute sermon on faith and perseverance based on James 1:2-4, for a congregation facing challenges."`,
                }),
            },
            resolve: async (query, _parent, args, ctx) => {
                const reqUser = ctx.user ?? null;

                if (!reqUser) {
                    throw new Error(
                        'Reached illegal state: no user in context',
                    );
                }

                const user = await prisma.user.findUnique({
                    where: { id: reqUser.id },
                });

                if (!user) {
                    throw new Error(
                        'Reached illegal state: contextual user not found',
                    );
                }

                // todo: Pull in more contextual info to guide sermon generation
                const sermonAgent = new SermonAgent({
                    pastorName: `${user.firstName} ${user.lastName}`,
                    churchName: `${user.church}`,
                    denomination: `${user.denomination}`,
                });

                let sermonResponse: SermonAgentResponse;

                try {
                    sermonResponse = await sermonAgent.requestSermon(
                        args.prompt,
                    );
                } catch (e) {
                    throw new GraphQLError('Failed to generate sermon');
                }

                if (!sermonResponse) {
                    throw new GraphQLError('Failed to generate sermon');
                }

                const result = prisma.sermon.create({
                    data: {
                        authorId: user.id,
                        ...sermonResponse,
                    },
                });

                return result;
            },
        }),
    }),
});
