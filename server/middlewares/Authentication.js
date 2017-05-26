/**
 * Dependencies declared
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';
import db from '../models/Index';

dotenv.config();
// jwt secret key
const secretKey = process.env.SECRET;

const Authentication = {
  /**
   * Verifies session token
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @param  {Object} next Next process handler
   * @return {Object}          Return object
   */
  verifyToken(request, response, next) {
    const token = request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          return response.status(401)
            .send({
              message: 'Token supplied is invalid.'
            });
        }
        db.User.findById(decoded.userId)
          .then((user) => {
            if (!user) {
              return response.status(404)
                .send({
                  message: 'Account does not exist. Kindly signup.'
                });
            }
            if (!user.active) {
              return response.status(404)
                .send({
                  message: 'Please sign in to access account.'
                });
            }
            request.tokenDecode = decoded;
            request.tokenDecode.roleId = user.roleId;
            next();
          });
      });
    } else {
      response.status(400)
        .send({
          message: 'Unauthorized Access.'
        });
    }
  },
  /**
   * Check for admin rights
   * @param  {Object} request  Request object
   * @param  {Object} response Response object
   * @param  {Object} next Next process handler
   * @return {Object}        Return object
   */
  checkAdminRights(request, response, next) {
    db.Role
      .findById(request.tokenDecode.roleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        }
        return response.status(403)
          .send({
            message: 'You are not permitted to perform this action.'
          });
      });
  },
  /**
   * Gets user jwt token
   * @param  {user} user Users' object
   * @return {[type]}      [description]
   */
  getToken(user) {
    const userToken = jwt.sign({
      userId: user.id,
      roleId: user.roleId
    },
      secretKey, { expiresIn: '3d' });
    return userToken;
  },
  /**
   * Verifies user login details
   * @param  {[type]} request  [description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  verifyLogin(request, response, next) {
    if (!request.body.password || !request.body.email) {
      return response.status(400)
        .send({
          message: 'Please provide your email and password to login.'
        });
    }

    const email = /\S+@\S+\.\S+/.test(request.body.email),
      password = /\w+/g.test(request.body.password);
    if (!email || !password) {
      return response.status(400)
        .send({
          message: 'Please enter a valid email and password.'
        });
    }
    next();
  },
  /**
   * Checks users' input
   * @param  {Object} request  Request object
   * @param  {Object} request  Response object
   * @param  {Object} response Next process handler
   * @return {Object}          Return object
   */
  verifyUserInput(request, response, next) {
    let email = /\S+@\S+\.\S+/.test(request.body.email),
      firstName = /\w+/g.test(request.body.firstname),
      lastName = /\w+/g.test(request.body.lastname),
      userName = /\w+/g.test(request.body.username),
      password = /\w+/g.test(request.body.password);

    if (!email) {
      return response.status(400)
        .send({
          message: 'Please enter a valid email address.'
        });
    }
    if (!firstName) {
      return response.status(400)
        .send({
          message: 'Please enter a valid firstname.'
        });
    }
    if (!lastName) {
      return response.status(400)
        .send({
          message: 'Please enter a valid lastname.'
        });
    }
    if (!userName) {
      return response.status(400)
        .send({
          message: 'Please enter a valid username.'
        });
    }
    if (!password) {
      return response.status(400)
        .send({
          message: 'Password field cannot be empty. Please enter a password.'
        });
    }
    if (request.body.password.length < 8) {
      return response.status(400)
        .send({
          message: 'Password cannot be less than 8 characters. Try again.'
        });
    }
    db.User.findOne({ where: { email: request.body.email } })
      .then((user) => {
        if (user) {
          return response.status(409)
            .send({
              message: 'Email address already exist.'
            });
        }
        db.User.findOne({ where: { username: request.body.username } })
          .then((newUser) => {
            if (newUser) {
              return response.status(409)
                .send({
                  message: 'Username already exist.'
                });
            }
            userName = request.body.username;
            firstName = request.body.firstname;
            lastName = request.body.lastname;
            email = request.body.email;
            password = request.body.password;

            const roleId = request.body.roleId || 2;
            request.userInput = { userName,
              firstName,
              lastName,
              email,
              password,
              roleId
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
   * @return {Object}            Response object
   */
  verifyOwner(request, response, next) {
    db.Document.findById(request.params.id)
      .then((document) => {
        if (document.ownerId === request.decoded.userId) {
          next();
        } else {
          return response.status(401)
            .send({
              message: 'You do not have the rights to perform this action.'
            });
        }
      })
      .catch(() => {
        return response.status(404)
          .send({
            message: `Document with ${request.params.id} not found`
          });
      });
  }
};

export default Authentication;
