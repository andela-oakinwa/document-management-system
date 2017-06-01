'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../helpers/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

var _Authentication = require('../middlewares/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * User Controller
 */
/**
 * Dependencies declared
 */
var UserController = {
  /**
   * Create a new user
   * Route: POST: /users
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  createUser: function createUser(request, response) {
    _models2.default.User.create(request.body).then(function (user) {
      var token = _Authentication2.default.getToken(user);
      user = _Helper2.default.userProfile(user);
      return response.status(201).send({
        message: 'Your account has been created successfully.',
        token: token,
        user: user
      });
    }).catch(function (error) {
      response.status(500).send({
        message: 'An error has occured. Account was not created',
        error: error
      });
    });
  },

  /**
   * User login
   * Route:  POST: /users/login
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  login: function login(request, response) {
    var _request$body = request.body,
        email = _request$body.email,
        password = _request$body.password;

    _models2.default.User.findOne({ where: { email: email } }).then(function (user) {
      if (user && _bcryptNodejs2.default.compareSync(password, user.password)) {
        user.update({ active: true });
        var token = _Authentication2.default.getToken(user);
        user = _Helper2.default.userProfile(user);
        return response.status(200).send({
          message: 'You have successfully logged in.',
          token: token,
          user: user
        });
      }
      response.status(401).send({
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
  logout: function logout(request, response) {
    _models2.default.User.findOne({
      where: {
        id: request.body.id
      }
    }).then(function (user) {
      user.update({ active: false }).then(function () {
        response.status(200).send({
          message: 'You have successfully logged out.'
        });
      });
    });
  },

  /**
   * Get a particular user
   * Route: GET: /users/:id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  getUser: function getUser(request, response) {
    _models2.default.User.findById(request.params.id).then(function (user) {
      response.status(200).send({
        message: 'You have successfully retrieved this user.',
        user: _Helper2.default.userProfile(user)
      });
    }).catch(function (error) {
      response.status(400).send({
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
  getAllUsers: function getAllUsers(request, response) {
    var query = {
      attributes: _Helper2.default.getUserAttribute(),
      include: [{
        model: _models2.default.Role,
        as: 'Role'
      }],
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'ASC']]
    };
    _models2.default.User.findAndCountAll(query).then(function (users) {
      if (users) {
        var constraint = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        var paging = _Helper2.default.paging(constraint);
        response.status(200).send({
          message: 'You have succesfully retrieved all users.',
          users: users,
          paging: paging
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
  updateUser: function updateUser(request, response) {
    _models2.default.User.findById(request.params.id).then(function (user) {
      if (!user) {
        return response.status(404).send({
          message: 'User not found'
        });
      }
      _models2.default.User.update(request.body).then(function (updatedUser) {
        updatedUser = _Helper2.default.userProfile(updatedUser);
        response.status(200).send({
          message: 'Profile has been updated successfully.',
          updatedUser: updatedUser
        });
      });
    }).catch(function (error) {
      response.status(400).send({
        message: error.message
      });
    });
  },

  /**
   * Delete a user with specific id
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  deleteUser: function deleteUser(request, response) {
    _models2.default.User.findById(request.params.id).then(function (user) {
      if (request.params.roleId === 1) {
        user.destroy();
        response.status(200).send({
          message: 'This account has been successfully deleted.'
        });
      }
    }).catch(function (error) {
      response.status(500).send(error.message);
    });
  },

  /**
   * Get all documents owned by a particular user
   * Route: GET: /users/:id/documents
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   */
  getUserDocuments: function getUserDocuments(request, response) {
    _models2.default.Document.findAll({ where: { ownerId: request.params.id } }).then(function (allDocs) {
      response.send({
        message: 'Documents for user retrieved successfully.',
        allDocs: allDocs
      });
    }).catch(function (error) {
      response.status(404).send({
        message: error.message
      });
    });
  }
};

exports.default = UserController;