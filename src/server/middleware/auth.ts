import koaJwt from 'koa-jwt';

const secretKey = process.env.SECRET_KEY

if (!secretKey) {
    throw new Error('Secret key is not provided. Please provide a secret key to sign the JWT token.');
}
export const jwtMiddleware = koaJwt({ secret: secretKey, passthrough: false });