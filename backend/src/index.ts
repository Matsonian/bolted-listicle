import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import {
    expressMiddleware,
    ExpressContextFunctionArgument,
} from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './permissions';
import * as path from 'path';
import { getAuthenticatedUser } from './auth';
import * as resolvers from './resolvers';
import http from 'http';
import { prisma } from './schemabuilder';
import { schema } from './schema';
import { healthz } from './routes/healthz';

dotenv.config();

const port = process.env.PORT || 4000;
const startServer = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const schemaWithPermissions = applyMiddleware(schema, permissions);

    const server = new ApolloServer({
        schema: schemaWithPermissions,
        formatError: (error) => {
            process.env.environment === 'dev' && console.error(error);
            return error;
        },
    });

    await server.start();

    const corsOptions = {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        'Access-Control-Allow-Credentials': true,
    };

    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });
    app.use(
        '/graphql',
        cors(corsOptions),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }: ExpressContextFunctionArgument) => {
                const user = await getAuthenticatedUser(
                    prisma,
                    req.headers.authorization,
                );
                return {
                    user,
                };
            },
        }),
    );

    app.use('/healthz', healthz);

    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

startServer();
