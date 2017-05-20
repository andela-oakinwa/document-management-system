/**
 * Dependencies declared
 */
import isEmpty from 'lodash/isEmpty';
import express from 'express';
import validator from 'validator';
import UserController from '../controllers/UserController';
import Authentication from '../middlewares/Authentication';
/**
 * Routes for user
 * @type {Object}
 */
const userRouter = express.Router(),
  validateInput = (data) => {
    const errors = {};
    if (validator.isEmpty(data.firstname)) {
      errors.firstname = 'This field is required';
    }
    if (validator.isEmpty(data.lastname)) {
      errors.lastname = 'This field is required';
    }
    if (validator.isEmpty(data.username)) {
      errors.username = 'This field is required';
    }
    if (validator.isEmpty(data.email)) {
      errors.email = 'This field is required';
    }
    if (!validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.password)) {
      errors.password = 'This field is required';
    }
    if (validator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };
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
  .get(Authentication.verifyToken,
    UserController.getAllUsers)
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
  .put(Authentication.verifyToken,
    UserController.updateUser)
  .delete(Authentication.verifyToken, Authentication.checkAdminRights,
    UserController.deleteUser);
/**
 * Get all user document routes
 */
userRouter.route('/:id/documents')
  .get(Authentication.verifyToken, UserController.getUserDocuments);

export default userRouter;
