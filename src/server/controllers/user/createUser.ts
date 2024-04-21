import { Context } from "koa";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { UserRequestBody } from "../../../types/interfaces";

const prisma = new PrismaClient();

export const createUser = async (ctx: Context) => {
    const { name, email, password } = ctx.request.body as UserRequestBody;

    if (!email || !password) {
        ctx.status = 400;
        ctx.body = { message: 'The email and password are required' };
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                admin: false,
            },
        });

        const { password: _, ...result } = user;

        ctx.status = 201;
        ctx.body = result;
    } catch (error: any) {
        if (error.code === 'P2002') {
            ctx.status = 400;
            ctx.body = { message: 'The email is already in use' };
        } else {
            ctx.status = 500;
            ctx.body = { message: 'Error creating user', error: error.message };
        }
    }
};