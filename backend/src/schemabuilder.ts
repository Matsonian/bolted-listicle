import { PrismaClient, Prisma } from '@prisma/client';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { Context } from './context';
import { DateResolver, JSONResolver } from 'graphql-scalars';
import PrismaTypes from './generated/pothos-types';

/// according to https://pothos-graphql.dev/docs/plugins/prisma/setup
/// It is strongly recommended NOT to put your prisma client into Context
/// see: https://github.com/microsoft/TypeScript/issues/45405
export const prisma = new PrismaClient();

export const builder = new SchemaBuilder<{
    Context: Context;
    PrismaTypes: PrismaTypes;
    Scalars: {
        JSON: {
            Input: unknown;
            Output: unknown;
        };
        Date: {
            Input: Date;
            Output: Date;
        };
    };
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
        // Because the prisma client is loaded dynamically,
        // we need to explicitly provide the some information about the prisma schema
        dmmf: Prisma.dmmf,
    },
});

builder.addScalarType('Date', DateResolver);
builder.addScalarType('JSON', JSONResolver);
