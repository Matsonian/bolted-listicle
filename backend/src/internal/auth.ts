import {
    $Enums,
    Prisma,
    PrismaClient,
    User as PrismaUser,
} from '@prisma/client';
import { zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { match } from 'assert';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
export const APP_SECRET = process.env.APP_SECRET;

export function signAccessToken(userId: string) {
    if (!APP_SECRET) {
        throw new Error('APP_SECRET was not defined');
    }

    return jwt.sign({ sub: userId }, APP_SECRET, { expiresIn: '15m' });
}

function verifyAccess(token: string) {
    if (!APP_SECRET) {
        throw new Error('APP_SECRET was not defined');
    }

    return jwt.verify(token, APP_SECRET) as {
        sub: string;
        iat: number;
        exp: number;
    };
}

export async function getAuthenticatedUser(
    db: PrismaClient,
    token: string,
): Promise<{ id: string; role: $Enums.UserRole } | null> {
    const { sub } = verifyAccess(token);

    if (!sub) {
        throw new GraphQLError('Invalid authorization token');
    }

    const found = await db.user.findUnique({
        where: {
            id: sub,
        },
        select: { id: true, role: true },
    });

    return found;
}

/**
 * getPasswordStrength checks the strength of a password using zxcvbn
 * and returns a score from 0 to 4 (0 = weakest, 4 = strongest).
 *
 * 0 - too guessable: risky password. (guesses < 10^3)
 * 1 - very guessable: protection from throttled online attacks. (guesses < 10^6)
 * 2 - somewhat guessable: protection from unthrottled online attacks. (guesses < 10^8)
 * 3 - safely unguessable: moderate protection from offline slow-hash scenario. (guesses < 10^10)
 * 4 - very unguessable: strong protection from offline slow-hash scenario. (guesses >= 10^10)
 *
 * @param password
 * @returns Promise<number> score from 0 to 4
 */
export async function getPasswordStrength(password: string): Promise<number> {
    const options = {
        translations: zxcvbnEnPackage.translations,
        graphs: zxcvbnCommonPackage.adjacencyGraphs,
        dictionary: {
            ...zxcvbnCommonPackage.dictionary,
            ...zxcvbnEnPackage.dictionary,
        },
    };
    zxcvbnOptions.setOptions(options);

    const result = await zxcvbnAsync(password);

    return result.score;
}
