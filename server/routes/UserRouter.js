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
 * Create and retrieve user(s) route
 */
userRouter.route('/')
  .post(Authentication.verifyUserInput, UserController.createUser)
  .get(Authentication.verifyToken, UserController.getAllUsers);
/**
 * Login route
 */
userRouter.route('/login')
  .post(Authentication.verifyLogin, UserController.login);
/**
 * Logout route
 */
userRouter.route('/logout')
  .post(UserController.logout);
/**
 * Route for retrieving, modification and deletion of user
 */
userRouter.route('/:id')
  .get(Authentication.verifyToken, UserController.getUser)
  .put(Authentication.verifyToken, UserController.updateUser)
  .delete(Authentication.verifyToken, Authentication.checkAdminRights,
    UserController.deleteUser);
/**
 * Get all user document routes
 */
userRouter.route('/:id/documents')
  .get(Authentication.verifyToken, UserController.getUserDocuments);


export default userRouter;

/**
 * goes into a search route and controller
 */
searchRouter('/users')
  .get(Authentication.verifyToken, Authentication.checkAdminRights,
    SearchController.searchUser);
