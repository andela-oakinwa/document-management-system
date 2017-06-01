'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _DocumentController = require('../controllers/DocumentController');

var _DocumentController2 = _interopRequireDefault(_DocumentController);

var _Authentication = require('../middlewares/Authentication');

var _Authentication2 = _interopRequireDefault(_Authentication);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Document router object
 * @type {Object}
 */
var documentRouter = _express2.default.Router();
/**
 * Default routes for creating document
 */
/**
 * Dependencies declared
 */
documentRouter.route('/').post(_Authentication2.default.verifyToken, _DocumentController2.default.createDocument).get(_Authentication2.default.verifyToken, _DocumentController2.default.getAllDocuments);
/**
 * Routes to retrieve document
 */
documentRouter.get('./search', _Authentication2.default.verifyToken);
/**
 * Routes for retrieving, updating and deleting document
 */
documentRouter.route('/:id').get(_Authentication2.default.verifyToken, _DocumentController2.default.getDocument).put(_Authentication2.default.verifyToken, _Authentication2.default.verifyOwner, _DocumentController2.default.updateDocument).delete(_Authentication2.default.verifyToken, _Authentication2.default.verifyOwner, _DocumentController2.default.deleteDocument);

exports.default = documentRouter;