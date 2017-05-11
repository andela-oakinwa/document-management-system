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
   * @return {Object}          Returned object
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
   * @return {Object}          Returned object
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
   * @return {Object}          Returned object
   */
  getUser(request, response) {
    return response.status(200)
      .send({
        message: 'You have successfully retrieved this user.',
        user: Helper.getUserProfile(request.getUser)
      });
  },
  /**
   * Get all users
   * Route: GET: /users
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Returned object
   */
  getAllUsers(request, response) {
    db.User
      .findAndCountAll(request.doqmanFilter)
      .then((users) => {
        if (users) {
          const constraint = {
            count: users.count,
            limit: request.doqmanFilter.limit,
            offset: request.doqmanFilter.offset
          };
          delete users.count;
          const paging = Helper.paging(constraint);
          response.status(200)
            .send({
              message: 'You have succesfully retrieved all users.',
              users,
              paging
            });
        }
      });
  },
  /**
   * Update a user attribute
   * Route: PUT: /users/:id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Returned object
   */
  updateUser(request, response) {
    request.userInstance.update(request.body)
      .then((updatedUser) => {
        response.status(200)
          .send({
            message: 'Profile has been updated.',
            updatedUser
          });
      })
      .catch((error) => {
        response.status(400)
          .send({
            message: error.errors
          });
      });
  },
  /**
   * Delete a user by id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  deleteUser(request, response) {
    request.userInstance.destroy()
      .then(() => {
        response.status(200)
          .send({
            message: 'This account has been successfully deleted.'
          });
      })
      .catch((error) => {
        response.status(500)
          .send(error.errors);
      });
  },
  /**
   * Get all documents for user
   * Route: GET: /users/:id/documents
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @return {Object}          Return object
   */
  getUserDocuments(request, response) {
    const userDocuments = {};
    db.User.findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404)
            .send({
              message: 'This user does not exist.'
            });
        }
        userDocuments.user = Helper.getUserProfile(user);
        request.doqmanFilter.where.ownerId = request.params.id;
        request.doqmanFilter.attributes = Helper.getDocumentAttr();
        db.Document.findAndCountAll(request.doqmanFilter)
          .then((files) => {
            const constraint = {
              count: files.count,
              limit: request.doqmanFilter.limit,
              offset: request.doqmanFilter.offset
            };
            delete files.count;
            const paging = Helper.paging(constraint);
            userDocuments.documents = files;
            return response.status(200)
              .send({
                message: 'User\'s documents was retrieved successfully.',
                userDocuments,
                paging
              });
          });
      });
  }
};

export default UserController;
