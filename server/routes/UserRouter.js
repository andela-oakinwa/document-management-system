/**
 * Dependencies declared
 */
import express from 'express';
import UserController from '../controllers/UserController';
import Authentication from '../middlewares/Authentication';
/**
 * Routes for user
 * @type {Object}
 */
const userRouter = express.Router();

userRouter.route('/')
  .get()
  .post();

userRouter.route('/login')
  .post();

userRouter.route('/logout')
  .post();

userRouter.get('/search');

userRouter.route('/:id')
  .get()
  .put()
  .delete();

userRouter.route('/:id/documents')
  .get();

export default userRouter;
