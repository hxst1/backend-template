import { Context } from 'koa';

export const notFoundError = async (ctx: Context) => {
    ctx.status = 404;
    ctx.body = { error: true, message: "Error 404. Endpoint not found" };
};

export const generalError = async (ctx: Context, next: () => Promise<any>) => {
    try {
        await next();
    } catch (err) {
        const error = err as Error & { status?: number; statusCode?: number; };

        console.log(`Error: ${error.message}`);
        const errorCode = error.status ?? error.statusCode ?? 500;
        const errorMessage = errorCode !== 500 ? error.message : "General error";
        ctx.status = errorCode;
        ctx.body = { error: true, message: errorMessage };
    }
};