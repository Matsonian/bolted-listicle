import { rule, shield, allow, and, or, inputRule } from 'graphql-shield';
import { Context } from './context';
import { GraphQLError } from 'graphql';
import validator from 'validator';
import { UserRole } from '@prisma/client';
// import { Role } from '@prisma/client';

export const isAuthenticated = rule({ cache: 'contextual' })(async (
    _,
    __,
    ctx: Context,
) => {
    return ctx.user !== null;
});

const isOwner = rule({ cache: 'contextual' })(async (
    _,
    { userId }: { userId: string },
    ctx: Context,
) => {
    if (!ctx.user) {
        return false;
    }
    return ctx.user.id === userId;
});

export const userHasRole = (r: UserRole) =>
    rule({ cache: 'contextual' })(async (_, __, ctx: Context) => {
        if (ctx.user?.role !== r)
            throw new GraphQLError('Not Authorized', {
                extensions: { code: 'FORBIDDEN' },
            });

        return true;
    });

// const isAdmin = rule({ cache: 'contextual' })(async (_, __, ctx: Context) => {
//   if (!ctx.user) {
//     return false;
//   }
//   return ctx.user.role === Role.ADMIN;
// });

const isEmail = rule()((_parent, { email }: { email: string }) => {
    return (
        validator.isEmail(email) || new GraphQLError('Invalid email format.')
    );
});

const isNotEmpty = (field: string) =>
    rule()((_parent, args: { [key: string]: string }) => {
        const value = args[field];
        return (
            (typeof value === 'string' && value.length > 0) ||
            new GraphQLError(
                `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
            )
        );
    });

export const permissions = shield(
    {
        Query: {
            '*': isAuthenticated,
            user: isAuthenticated,
            users: 
            allow,
            // and(isAuthenticated, userHasRole(UserRole.ADMIN)),
        },
        Mutation: {
            '*': isAuthenticated,
            sendOtp: and(isNotEmpty('email'), isEmail),
            signInWithOtp: allow,
            signUpOrInWithPassword: and(
                isNotEmpty('email'),
                isEmail,
                isNotEmpty('password'),
            ),
            ssoLogin: allow,
            updateUserProfile: and(isAuthenticated, isOwner),
        },
    },
    {
        allowExternalErrors: true,
    },
);
