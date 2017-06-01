'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _SearchController = require('../controllers/SearchController');

var _SearchController2 = _interopRequireDefault(_SearchController);

var _Authentication = require('../middlewares/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Routes for search
 */
var searchRoute = _express2.default.Router();
/**
 * Search for user(s)
 */
/**
 * Dependencies declared
 */
searchRoute.route('/users').get(_Authentication2.default.verifyToken, _SearchController2.default.searchUser);
/**
 * Search for document(s)
 */
searchRoute.route('/documents').get(_Authentication2.default.verifyToken, _SearchController2.default.searchDocument);