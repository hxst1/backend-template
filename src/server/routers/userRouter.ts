import Router from 'koa-router';
import { listUsers, createUser, updateUser, authUser, me, deleteUser } from "../controllers/user";
import { jwtMiddleware } from "../middleware/auth";

const userRouter = new Router();

userRouter.post('/auth', authUser)
userRouter.post('/new', createUser);

userRouter.use(jwtMiddleware);
userRouter.get('/me', me)
userRouter.get('/', listUsers);
userRouter.patch('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
