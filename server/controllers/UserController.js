/**
 * Dependencies declared
 */
import db from '../models';
import Helper from '../helpers/Helper';
import Authentication from '../middlewares/Authentication';

/**
 * User Controller
 */
const UserController = {
  /**
   * Create a new user
   * Route: POST: /users
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Return an object or void
   */
  createUser(request, response) {
    db.User
      .create(request.userInput)
      .then((user) => {
        const token = Authentication.getToken(user);
        user = Helper.userProfile(user);
        return response.status(201)
          .send({
            message: 'Your account has been created successfully.',
            token,
            user
          });
      })
      .catch((error) => {
        response.status(400)
          .send({
            errorType: Helper.errorType(error)
          });
      });
  },
  /**
   * User login
   * Route:  POST: /users/login
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  login(request, response) {
    db.User
      .findOne({ where: { email: request.body.email } })
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          user.update({ active: true });
          const token = Authentication.getToken(user);
          user = Helper.getUserProfile(user);
          return response.status(200)
            .send({
              message: 'You have successfully logged in.',
              token,
              user
            });
        }
        response.status(401)
          .send({
            message: 'Incorrect login credentials. Please try again.'
          });
      });
  },
  /**
   * User logout
   * Route: POST: /users/logout
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  logout(request, response) {
    db.User
      .findById(request.tokenDecode.userId)
      .then((user) => {
        user.update({ active: false })
          .then(() => {
            response.status(200)
              .send({
                message: 'You have successfully logged out.'
              });
          });
      });
  },
  /**
   * Get a user by Id
   * Route: GET: /users/:id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  getUser(request, response) {

  },
  getAllUser(request, response) {},
  updateUser(request, response) {},
  /**
   * Delete a user by id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  deleteUser(request, response) {}
  
};

export default UserController;
