import { builder, prisma } from '../schemabuilder';
import { UserType } from './types';
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

