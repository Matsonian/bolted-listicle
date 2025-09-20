import { builder, prisma } from '../schemabuilder';
import { SermonType, UserType } from './types';
import { GraphQLError } from 'graphql';

export const UserQueries = builder.queryType({
    fields: (t) => ({
        user: t.prismaField({
            type: UserType,
            resolve: async (query, root, args, ctx) => {
              if(!ctx.user){
                throw new GraphQLError('No user')
              }
                return await prisma.user.findUniqueOrThrow({
                    where: { id: ctx.user.id },
                    ...query,
                });
            },
        }),
        users: t.prismaField({
            type: [UserType],
            resolve: (query, root, args, ctx) => {
                // todo: Support pagination?
                return prisma.user.findMany({
                    ...query,
                });
            },
        }),
    }),
});

export const SermonQueries = builder.queryType({
    fields: (t) => ({
        sermon: t.prismaField({
            type: SermonType,
            args: { sermonId: t.arg.string({ required: true }) },
            resolve: async (query, root, { sermonId }, ctx) => {
                const sermon = await prisma.sermon.findUnique({
                    where: { id: sermonId },
                    ...query,
                });

                if (sermon?.authorId !== ctx.user?.id) {
                    // Do not allow access to sermons not owned by the user
                    return null;
                }

                return sermon;
            },
        }),
        sermons: t.prismaField({
            type: [SermonType],
            args: {
                userId: t.arg.string({ required: true }),
            },
            resolve: (query, root, { userId }, ctx) => {
                return prisma.sermon.findMany({
                    where: { authorId: userId },
                    ...query,
                });
            },
        }),
    }),
});
