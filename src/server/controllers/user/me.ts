// get my user info from token and return data

import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const me = async (ctx: Context) => {
    const userId = ctx.state.user.userId;

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            ctx.status = 404;
            ctx.body = { message: 'User not found' };
            return;
        }

        const { password, ...userInfo } = user;
        ctx.status = 200;
        ctx.body = userInfo;
    } catch (error: any) {
        ctx.status = 500;
        ctx.body = { message: 'Error getting my user info', error: error.message };
    }
};