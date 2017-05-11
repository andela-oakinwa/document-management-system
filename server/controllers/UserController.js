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
  login(request, response) {},
  logout(request, response) {},
  getUser(request, response) {},
  getAllUser(request, response) {},
  updateUser(request, response) {},
  deleteUser(request, response) {}
  
};

export default UserController;
