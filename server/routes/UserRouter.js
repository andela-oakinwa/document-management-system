/**
 * Dependencies declared
 */
import express from 'express';
import UserController from '../controllers/UserController';
import Authentication from '../middlewares/Authentication';
import validateInput from '../shared/ValidateInput';
/**
 * Routes for user
 * @type {Object}
 */
const userRouter = express.Router();
/**
 * Create user route
 */
userRouter.post('/', (request, response) => {
  const { errors, isValid } = validateInput(request.body);
  if (!isValid) {
    response.status(400).json(errors);
  }
});
userRouter.route('/')
  .post(Authentication.validateInput)
  .get(Authentication.verifyToken, UserController.getAllUsers)
  .post(Authentication.verifyUserInput, UserController.createUser);
/**
 * Login route
 */
userRouter.route('/login')
  .post(Authentication.verifyLogin, UserController.login);
/**
 * Logout route
 */
userRouter.route('/logout')
  .post(Authentication.verifyToken, UserController.logout);
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
