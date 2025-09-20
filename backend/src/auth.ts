import * as jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { GraphQLError } from 'graphql';
import * as argon2 from 'argon2';
import { sendWelcomeEmail } from './email/emailService';

export const APP_SECRET = process.env.APP_SECRET;

export interface AuthTokenPayload {
    userId: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        throw new Error('No token found');
    }
    return jwt.verify(token, APP_SECRET!) as AuthTokenPayload;
}

export async function getAuthenticatedUser(
    prisma: PrismaClient,
    authHeader?: string,
): Promise<User | null> {
    if (!authHeader) {
        return null;
    }

    try {
        const token = decodeAuthHeader(authHeader);
        return await prisma.user.findUnique({ where: { id: token.userId } });
    } catch (err) {
        console.error(err);
        return null;
    }
}
export async function ssoLoginHandler({
    provider,
    accessToken,
    prisma,
}: {
    provider: string;
    accessToken: string;
    prisma: PrismaClient;
}) {
    let userProfile;
    if (provider === 'google') {
        const response = await fetch(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        userProfile = await response.json();

        if (!response.ok) {
            console.error('Google API Error:', userProfile);
            throw new GraphQLError(
                `Failed to fetch user profile from Google: ${JSON.stringify(
                    userProfile,
                )}`,
            );
        }
    } else if (provider === 'facebook') {
        const response = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
        );
        userProfile = await response.json();
        if (!response.ok) {
            console.error('Facebook API Error:', userProfile);
            throw new GraphQLError(
                `Failed to fetch user profile from Facebook: ${JSON.stringify(
                    userProfile,
                )}`,
            );
        }
    } else {
        throw new Error('Unsupported SSO provider');
    }

    if (!userProfile.email) {
        throw new Error('Email not provided by SSO provider');
    }

    let user = await prisma.user.findUnique({
        where: { email: userProfile.email },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: userProfile.email,
                firstName: userProfile.name,
                provider,
            },
        });
        await sendWelcomeEmail(userProfile.email, userProfile.name);
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET!);
    return {
        token,
        userId: user.id,
        user,
    };
}

export async function signUpOrInWithPasswordHandler({
    email,
    password,
    prisma,
}: {
    email: string;
    password?: string;
    prisma: PrismaClient;
}) {
    let user = await prisma.user.findUnique({
        where: { email },
    });

    if (user) {
        if (!user.password) {
            // User exists but created via SSO, so we can't compare passwords.
            // We can either throw an error or link the password to the account.
            // For now, we'll throw an error.
            throw new GraphQLError(
                'An account with this email already exists. Please sign in with your original method.',
            );
        }

        const passwordMatch = await argon2.verify(password!, user.password);
        if (!passwordMatch) {
            throw new GraphQLError('Invalid password.');
        }
    } else {
        const hashedPassword = await argon2.hash(password!);
        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                provider: 'emailPassword',
            },
        });
        await sendWelcomeEmail(email);
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET!);
    return {
        token,
        userId: user.id,
        user,
    };
}
