import { Context } from "koa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UserRequestBody } from "../../../types/interfaces";

const prisma = new PrismaClient();

export const authUser = async (ctx: Context) => {
    const { email, password } = ctx.request.body as UserRequestBody;

    if (!email || !password) {
        ctx.status = 400;
        ctx.body = { message: 'The email and password are required' };
        return;
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        ctx.status = 404;
        ctx.body = { message: 'User not found' };
        return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid password' };
        return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('Secret key is missing');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        secretKey,
        { expiresIn: '1h' }
    );

    ctx.status = 200;
    ctx.body = { token };
};