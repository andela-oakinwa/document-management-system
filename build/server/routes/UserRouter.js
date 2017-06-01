'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _Authentication = require('../middlewares/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Routes for user
 * @type {Object}
 */
var userRouter = _express2.default.Router();
/**
 * Create and retrieve user(s) route
 */
/**
 * Dependencies declared
 */
userRouter.route('/').post(_Authentication2.default.verifyUserInput, _UserController2.default.createUser).get(_Authentication2.default.verifyToken, _UserController2.default.getAllUsers);
/**
 * Login route
 */
userRouter.route('/login').post(_Authentication2.default.verifyLogin, _UserController2.default.login);
/**
 * Logout route
 */
userRouter.route('/logout').post(_UserController2.default.logout);
/**
 * Route for retrieving, modification and deletion of user
 */
userRouter.route('/:id').get(_Authentication2.default.verifyToken, _UserController2.default.getUser).put(_Authentication2.default.verifyToken, _UserController2.default.updateUser).delete(_Authentication2.default.verifyToken, _Authentication2.default.checkAdminRights, _UserController2.default.deleteUser);
/**
 * Get all user document routes
 */
userRouter.route('/:id/documents').get(_Authentication2.default.verifyToken, _UserController2.default.getUserDocuments);

exports.default = userRouter;