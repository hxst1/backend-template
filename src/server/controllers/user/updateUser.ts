import { Context } from "koa";
import { PrismaClient } from "@prisma/client";
import { UserRequestBody } from "../../../types/interfaces";

const prisma = new PrismaClient();

export const updateUser = async (ctx: Context) => {
    const userId = parseInt(ctx.params.id);
    const { name, email } = ctx.request.body as UserRequestBody;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { name, email },
        });

        const { password, ...result } = updatedUser;

        ctx.status = 200;
        ctx.body = result;
    } catch (error: any) {
        if (error.code === 'P2002') {
            ctx.status = 400;
            ctx.body = { message: 'The email is already in use' };
        } else {
            ctx.status = 500;
            ctx.body = { message: 'Error updating user', error: error.message };
        }
    }
};