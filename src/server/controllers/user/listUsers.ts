import { Context } from 'koa';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const listUsers = async (ctx: Context) => {
    ctx.body = await prisma.user.findMany();
};