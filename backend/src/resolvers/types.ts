import { UserRole, MessageRole } from '@prisma/client';
import { builder } from '../schemabuilder';

export const UserRoleEnum = builder.enumType(UserRole, {
    name: 'UserRole',
});


export const MessageRoleEnum = builder.enumType(MessageRole, {
    name: 'MessageRole',
});

export interface AuthPayload {
    userId: string;
    token: string;
    user?: any | null;
}

export const AuthPayloadRef = builder.objectRef<AuthPayload>('AuthPayload');

export const UserType = builder.prismaObject('User', {
    name: 'User',
    select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isOnboarded: true,
        firstName: true,
        lastName: true,
        address1: true,
        address2: true,
        city: true,
        state: true,
        provider: true,
        role: true,
        Conversations: true,
    },
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email', { nullable: true }),
        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),
        isOnboarded: t.exposeBoolean('isOnboarded'),
        firstName: t.exposeString('firstName', { nullable: true }),
        lastName: t.exposeString('lastName', { nullable: true }),
        address1: t.exposeString('address1', { nullable: true }),
        address2: t.exposeString('address2', { nullable: true }),
        city: t.exposeString('city', { nullable: true }),
        state: t.exposeString('state', { nullable: true }),
        provider: t.exposeString('provider', { nullable: true }),
        role: t.expose('role', { type: UserRoleEnum }),
        Conversations: t.relation('Conversations'),
    }),
});

// Implement AuthPayload after UserType is defined so we can reference UserType directly
AuthPayloadRef.implement({
    description: 'payload for authenticated user',
    fields: (t) => ({
        userId: t.exposeString('userId'),
        token: t.exposeString('token'),
        // The resolver already returns `user` in the payload; expose it directly without re-querying
        user: t.expose('user', { type: UserType, nullable: true }),
    }),
});

export const AgentConversationType = builder.prismaObject('AgentConversation', {
    name: 'AgentConversation',
    select: {
        id: true,
        userId: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        metaData: true,
        AgentConversationMessage: true,
        user: true,
    },
    fields: (t) => ({
        id: t.exposeID('id'),
        userId: t.exposeString('userId'),
        title: t.exposeString('title', { nullable: true }),
        createdAt: t.expose('createdAt', { type: 'Date' }),
        updatedAt: t.expose('updatedAt', { type: 'Date' }),
        metaData: t.expose('metaData', { type: 'JSON' }),
        user: t.relation('user'),
        AgentConversationMessage: t.relation('AgentConversationMessage'),
    }),
});
export const AgentConversationMessageType = builder.prismaObject(
    'AgentConversationMessage',
    {
        name: 'AgentConversationMessage',
        select: {
            id: true,
            conversationId: true,
            role: true,
            content: true,
            contentJson: true,
            createdAt: true,
            updatedAt: true,
            metaData: true,
            conversation: true,
        },
        fields: (t) => ({
            id: t.exposeID('id'),
            conversationId: t.exposeString('conversationId'),
            role: t.expose('role', { type: MessageRoleEnum }),
            content: t.exposeString('content'),
            contentJson: t.expose('contentJson', { type: 'JSON' }),
            createdAt: t.expose('createdAt', { type: 'Date' }),
            updatedAt: t.expose('updatedAt', { type: 'Date' }),
            metaData: t.expose('metaData', { type: 'JSON' }),
            conversation: t.relation('conversation'),
        }),
    },
);

export const OneTimePasswordSchema = builder.prismaObject('OneTimePassword', {
    name: 'OneTimePassword',
    fields: (t) => ({
        id: t.exposeID('id'),
        email: t.exposeString('email'),
        code: t.exposeString('code'),
        createdAt: t.expose('createdAt', { type: 'Date' }),
        expiresAt: t.expose('expiresAt', { type: 'Date' }),
        used: t.exposeBoolean('used'),
    }),
});
