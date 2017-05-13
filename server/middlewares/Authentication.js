/**
 * Dependencies declared
 */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import validator from 'validator';
import db from '../models/Index';
import Helper from '../helpers/Helper';

const secretKey = process.env.SECRET;

const Authentication = {
  verifyToken(request, response, next) {},
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
  getToken(request, response) {},
  verifyLogin(request, response) {},
  /**
   * Checks users' input
   * @param  {Object} request  Request object
   * @param  {Object} request  Response object
   * @param  {Object} response Next process handler
   * @return {Object}          Return object
   */
  verifyUserInput(request, response, next) {
    if (request.body.roleId === 1) { // Not admin
      return response.status(403)
        .send({
          message: 'Permission denied. You can not signup as admin'
        });
    }
    let email = validator.isEmail(request.body.email),
      firstName = /\w+/g.test(request.body.firstName),
      lastName = /\w+/g.test(request.body.lastName),
      userName = /\w+/g.test(request.body.userName);

  },
  verifySearch(request, response) {}
};

export default Authentication;
