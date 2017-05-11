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
/**
 * Create user route
 */
userRouter.route('/')
  .get(Authentication.verifyToken,
    Authentication.validateSearch,
    UserController.getAllUser)
  .post(Authentication.verifyUserInput,
    UserController.createUser);
/**
 * Login route
 */
userRouter.route('/login')
  .post();
/**
 * Logout route
 */
userRouter.route('/logout')
  .post();
/**
 * Search user route
 */
userRouter.get('/search');

userRouter.route('/:id')
  .get()
  .put()
  .delete();

userRouter.route('/:id/documents')
  .get();

export default userRouter;
