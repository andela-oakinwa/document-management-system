'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _jsLogger = require('js-logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _dotenv = require('dotenv');

var dotenv = _interopRequireWildcard(_dotenv);

var _App = require('./config/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Disables logging error
 * @type {Object}
 */
/**
 * Entry point for Document Manangement System
 */
dotenv.config({
  silent: true
});
/**
 * Define server port
 */
var port = process.env.PORT || 4000;

_jsLogger2.default.useDefaults();
_App2.default.set('port', port);
/**
 * Creates server from import
 */
var server = _http2.default.createServer(_App2.default);
server.listen(port);
_jsLogger2.default.info('App is running at: ' + port + '/');