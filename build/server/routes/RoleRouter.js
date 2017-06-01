'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _RoleController = require('../controllers/RoleController');

var _RoleController2 = _interopRequireDefault(_RoleController);

var _Authentication = require('../middlewares/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Router for roles
 * @type {Object}
 */
var roleRouter = _express2.default.Router();
/**
 *Routes to create and retrieve roles
 */
/**
 * Dependencies declared
 */
roleRouter.route('/').post(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _RoleController2.default.createRole).get(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _RoleController2.default.getAllRole);
/**
 * Routes for accessing, creating and deleting role
 */
roleRouter.route('/:id').put(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _RoleController2.default.updateRole).get(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _RoleController2.default.getRole).delete(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _RoleController2.default.deleteRole);

exports.default = roleRouter;