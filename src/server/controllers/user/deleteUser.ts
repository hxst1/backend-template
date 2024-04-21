import { Context } from "koa";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUser = async (ctx: Context) => {
    const userId = parseInt(ctx.params.id);

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        ctx.status = 204;
    } catch (error: any) {
        ctx.status = 500;
        ctx.body = { message: 'Error deleting user', error: error.message };
    }
};

