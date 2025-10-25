import { GraphQLError } from 'graphql';
import {
    APP_SECRET,
    signUpOrInWithPasswordHandler,
    ssoLoginHandler,
} from '../auth';
import { Prisma } from '@prisma/client';
// import { sendOtpEmail, sendWelcomeEmail } from '../email/emailService';
import * as jwt from 'jsonwebtoken';
import { prisma, builder } from '../schemabuilder';
import { AuthPayloadRef, TierEnum } from './types';

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
                    // await sendOtpEmail(args.email, otpCode);
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
                    // await sendWelcomeEmail(otpRecord.email);
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
                        firstName: args.firstName ?? undefined,
                        lastName: args.lastName ?? undefined,
                    },
                });

                return updated;
            },
        }),
        updateUserSubscription: t.prismaField({
            type: 'User',
            args: {
                userId: t.arg.string({ required: true }),
                tier: t.arg({ type: TierEnum, required: true }),
                stripeCustomerId: t.arg.string({ required: true }),
                stripeSubscriptionId: t.arg.string({ required: true }),
                subscriptionStatus: t.arg.string({ required: true }),
            },
            resolve: async (query, _parent, args) => {
                return prisma.user.update({
                    ...query,
                    where: { id: args.userId },
                    data: {
                        tier: args.tier,
                        stripeCustomerId: args.stripeCustomerId,
                        stripeSubscriptionId: args.stripeSubscriptionId,
                        subscriptionStatus: args.subscriptionStatus,
                    },
                });
            },
        }),
        // NEW: Update subscription status with trial info
        updateSubscriptionStatus: t.prismaField({
            type: 'User',
            args: {
                stripeCustomerId: t.arg.string({ required: true }),
                stripeSubscriptionId: t.arg.string({ required: true }),
                subscriptionStatus: t.arg.string({ required: true }),
                trialEnd: t.arg.string({ required: false }),
            },
            resolve: async (query, _parent, args) => {
                return prisma.user.update({
                    ...query,
                    where: { stripeCustomerId: args.stripeCustomerId },
                    data: {
                        stripeSubscriptionId: args.stripeSubscriptionId,
                        subscriptionStatus: args.subscriptionStatus,
                        trialEnd: args.trialEnd ? new Date(args.trialEnd) : null,
                    },
                });
            },
        }),
        // NEW: Update subscription status by customer ID only
        updateSubscriptionStatusByCustomer: t.prismaField({
            type: 'User',
            args: {
                stripeCustomerId: t.arg.string({ required: true }),
                subscriptionStatus: t.arg.string({ required: true }),
            },
            resolve: async (query, _parent, args) => {
                return prisma.user.update({
                    ...query,
                    where: { stripeCustomerId: args.stripeCustomerId },
                    data: {
                        subscriptionStatus: args.subscriptionStatus,
                    },
                });
            },
        }),
        // NEW: Downgrade user by Stripe ID
        downgradeUserByStripeId: t.prismaField({
            type: 'User',
            args: {
                stripeCustomerId: t.arg.string({ required: true }),
            },
            resolve: async (query, _parent, args) => {
                return prisma.user.update({
                    ...query,
                    where: { stripeCustomerId: args.stripeCustomerId },
                    data: {
                        tier: 'FREE',  // ✅ Correct - straight quotes
                        subscriptionStatus: 'canceled',
                    },
                });
            },
        }),
        updateUser: t.prismaField({
            type: 'User',
            args: {
                firstName: t.arg.string(),
                lastName: t.arg.string(),
                address1: t.arg.string(),
                address2: t.arg.string(),
                city: t.arg.string(),
                state: t.arg.string(),
                email: t.arg.string(),
                isOnboarded: t.arg.boolean(),
                businessName: t.arg.string(),
                businessDescription: t.arg.string(),
                industry: t.arg.string(),
                productType: t.arg.string(),
                targetAudience: t.arg.string(),
                yearOfFounding: t.arg.int(),
                uniqueValueProposition: t.arg.string(),
                website: t.arg.string(),
                dailySearchesUsed: t.arg.int(),
                stripeCustomerId: t.arg.string()
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
```

**Key changes:**
1. Updated existing `updateUserSubscription` to include `userId` and `stripeSubscriptionId` 
2. Added `updateSubscriptionStatus` - for webhook to update trial status
3. Added `updateSubscriptionStatusByCustomer` - for payment failures
4. Added `downgradeUserByStripeId` - for subscription cancellations

Now:
1. **Save this file**
2. **Run migration** (if you haven't already):
```
   cd backend
   npx prisma migrate dev --name add_trial_fields
   npx prisma generate
