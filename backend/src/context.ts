import { $Enums, PrismaClient, User as PrismaUser } from '@prisma/client';
// import { HttpRequest, HttpResponse } from 'uWebSockets.js';

export interface Context {
    // req?: HttpRequest;
    // res?: HttpResponse;
    prisma: PrismaClient;
    user: { id: string; role: $Enums.UserRole } | null;
}
