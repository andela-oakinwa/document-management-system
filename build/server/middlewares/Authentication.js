'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
/**
 * Gets the jwt secret key
 * @type {Object}
 */
/**
 * Dependencies declared
 */
var secretKey = process.env.SECRET;

var Authentication = {
  /**
   * Verifies session token
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @param  {Object} next Next process handler
   */
  verifyToken: function verifyToken(request, response, next) {
    var token = request.headers['x-access-token'] || request.headers.authorization;
    if (token) {
      _jsonwebtoken2.default.verify(token, secretKey, function (error, decoded) {
        if (error) {
          return response.status(401).send({
            message: 'Token supplied is invalid.'
          });
        }
        _models2.default.User.findById(decoded.userId).then(function (user) {
          if (!user) {
            return response.status(404).send({
              message: 'Account does not exist. Kindly signup.'
            });
          }
          if (!user.active) {
            return response.status(404).send({
              message: 'Please sign in to access account.'
            });
          }
          request.tokenDecode = decoded;
          request.tokenDecode.roleId = user.roleId;
          next();
        });
      });
    } else {
      response.status(400).send({
        message: 'Unauthorized Access.'
      });
    }
  },

  /**
   * Check for admin rights
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @param  {Object} next Next process handler
   */
  checkAdminRights: function checkAdminRights(request, response, next) {
    _models2.default.Role.findById(request.tokenDecode.roleId).then(function (role) {
      if (role.title === 'admin') {
        next();
      }
      return response.status(403).send({
        message: 'You are not permitted to perform this action.'
      });
    });
  },

  /**
   * Gets user session jwt token
   * @param  {user} user Users' object
   * @return {Object} userToken
   */
  getToken: function getToken(user) {
    var userToken = _jsonwebtoken2.default.sign({
      userId: user.id,
      roleId: user.roleId
    }, secretKey, { expiresIn: '3d' });
    return userToken;
  },

  /**
   * Verifies user login details
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @param {Object} next Next process handler
   * @return {Object}
   */
  verifyLogin: function verifyLogin(request, response, next) {
    if (!request.body.password || !request.body.email) {
      return response.status(400).send({
        message: 'Please provide your email and password to login.'
      });
    }
    var email = /\S+@\S+\.\S+/.test(request.body.email),
        password = /\w+/g.test(request.body.password);
    if (!email || !password) {
      return response.status(400).send({
        message: 'Please enter a valid email and password.'
      });
    }
    next();
  },

  /**
   * Checks users' input
   * @param  {Object} request  Request object
   * @param  {Object} response  Response object
   * @param  {Object} next Next process handler
   * @return {Object}
   */
  verifyUserInput: function verifyUserInput(request, response, next) {
    var email = /\S+@\S+\.\S+/.test(request.body.email),
        firstName = /\w+/g.test(request.body.firstname),
        lastName = /\w+/g.test(request.body.lastname),
        userName = /\w+/g.test(request.body.username),
        password = /\w+/g.test(request.body.password);

    if (!email) {
      return response.status(400).send({
        message: 'Please enter a valid email address.'
      });
    }
    if (!firstName || firstName === 'undefined') {
      return response.status(400).send({
        message: 'Please enter a valid firstname.'
      });
    }
    if (!lastName || lastName === 'undefined') {
      return response.status(400).send({
        message: 'Please enter a valid lastname.'
      });
    }
    if (!userName || userName === 'undefined') {
      return response.status(400).send({
        message: 'Please enter a valid username.'
      });
    }
    if (!password || password === 'undefined') {
      return response.status(400).send({
        message: 'Password field cannot be empty. Please enter a password.'
      });
    }
    if (request.body.password.length < 8) {
      return response.status(400).send({
        message: 'Password cannot be less than 8 characters. Try again.'
      });
    }
    _models2.default.User.findOne({ where: { email: request.body.email } }).then(function (user) {
      if (user) {
        return response.status(409).send({
          message: 'Email address already exist.'
        });
      }
      _models2.default.User.findOne({ where: { username: request.body.username } }).then(function (newUser) {
        if (newUser) {
          return response.status(409).send({
            message: 'Username already exist.'
          });
        }
        userName = request.body.username;
        firstName = request.body.firstname;
        lastName = request.body.lastname;
        email = request.body.email;
        password = request.body.password;

        var roleId = request.body.roleId || 2;
        request.userInput = {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          roleId: roleId
        };
        next();
      });
    });
  },

  /**
   * Checks the owner of a file before any action
   * @param  {Object}   request  Request object
   * @param  {Object}   response Response object
   * @param  {Function} next     Calls the next function in route
   */
  verifyOwner: function verifyOwner(request, response, next) {
    _models2.default.Document.findById(request.params.id).then(function (document) {
      if (document.ownerId === request.tokenDecode.userId) {
        next();
      } else {
        return response.status(401).send({
          message: 'You do not have the rights to perform this action.'
        });
      }
    }).catch(function () {
      return response.status(404).send({
        message: 'Document with id:' + request.params.id + ' not found.'
      });
    });
  }
};

exports.default = Authentication;