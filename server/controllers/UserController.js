/**
 * Dependencies declared
 */
import bcrypt from 'bcrypt-nodejs';
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
   */
  createUser(request, response) {
    db.User
      .create(request.body)
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
        response.status(500)
          .send({
            message: 'An error has occured. Account was not created',
            error
          });
      });
  },
  /**
   * User login
   * Route:  POST: /users/login
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  login(request, response) {
    const { email, password } = request.body;
    db.User
      .findOne({ where: { email, } })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          user.update({ active: true });
          const token = Authentication.getToken(user);
          user = Helper.userProfile(user);
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
   */
  logout(request, response) {
    db.User
      .findOne({
        where: {
          id: request.body.id
        }
      })
      .then((user) => {
        user.update({ active: false })
          .then(() => {
            response.status(200)
              .send({
                message: 'You have successfully logged out.'
              });
          });
      })
      .catch(() => {
        response.status(400)
        .send({
          message: 'An error has occured. Invalid request'
        });
      });
  },
  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  getUser(request, response) {
    db.User
    .findById(request.params.id)
    .then((user) => {
      response.status(200)
        .send({
          message: 'You have successfully retrieved this user.',
          user: Helper.userProfile(user)
        });
    })
    .catch((error) => {
      response.status(400)
          .send({
            message: error.message
          });
    });
  },
  /**
   * Get all users
   * Route: GET: /users
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  getAllUsers(request, response) {
    const query = {
      attributes: Helper.getUserAttribute(),
      include: [{
        model: db.Role,
        as: 'Role'
      }],
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'ASC']]
    };
    db.User
      .findAndCountAll(query)
      .then((users) => {
        if (users) {
          const constraint = {
            count: users.count,
            limit: query.limit,
            offset: query.offset
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
   * Update a particular user
   * Route: PUT: /users/:id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  updateUser(request, response) {
    db.User.findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404)
            .send({
              message: 'User not found'
            });
        }
        user.update(request.body,
          { where: { id: request.body.id } })
          .then((updatedUser) => {
            response.status(200)
              .send({
                message: 'Profile has been updated successfully.',
                updatedUser,
              });
          });
      })
      .catch(() => {
        response.status(400)
          .send({
            message: 'Missing attributes. Please check details.'
          });
      });
  },
  /**
   * Delete a user with specific id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  deleteUser(request, response) {
    db.User.findById(request.params.id)
      .then((user) => {
        user.destroy();
        response.status(200)
          .send({
            message: 'User has been successfully deleted.'
          });
      })
      .catch(() => {
        response.status(500)
          .send({
            message: 'An error has occured. User not deleted.'
          });
      });
  },
  /**
   * Get all documents owned by a particular user
   * Route: GET: /users/:id/documents
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  getUserDocuments(request, response) {
    db.Document.findAll({ where: { ownerId: request.params.id } })
      .then((allDocs) => {
        response.send({
          message: 'Documents for user retrieved successfully.',
          allDocs
        });
      })
      .catch(() => {
        response.status(404)
          .send({
            message: 'Document not found'
          });
      });
  },
  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {void} no returns
   */
  searchUser(request, response) {
    const query = {
      where: {
        $or: [{
          username: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          firstName: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          lastName: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          email: {
            $iLike: `%${request.query.q}%`
          }
        }],
      },
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    db.User.findAndCountAll(query)
      .then((users) => {
        const results = users.rows.map(user => Helper.userProfile(user));
        const constraint = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        const paging = Helper.paging(constraint);
        response.status(200)
          .send({
            paging,
            rows: results
          });
        response.status(200)
          .send(results);
      });
  }
};

export default UserController;
