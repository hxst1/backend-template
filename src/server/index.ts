import Koa from 'koa';
import cors from '@koa/cors';
import morgan from "koa-morgan";
import helmet from "koa-helmet";
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { generalError, notFoundError } from './middleware/error';

import userRouter from './routers/userRouter';

const app = new Koa();
const apiRouter = new Router();

apiRouter.prefix('/api');

app.use(generalError);
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser());

apiRouter.use('/users', userRouter.routes(), userRouter.allowedMethods());

app.use(apiRouter.routes()).use(apiRouter.allowedMethods());

app.use(notFoundError);

export default app;
