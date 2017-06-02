'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _UserRouter = require('../routes/UserRouter');

var _UserRouter2 = _interopRequireDefault(_UserRouter);

var _RoleRouter = require('../routes/RoleRouter');

var _RoleRouter2 = _interopRequireDefault(_RoleRouter);

var _DocumentRouter = require('../routes/DocumentRouter');

var _DocumentRouter2 = _interopRequireDefault(_DocumentRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import searchRouter from '../routes/SearchRouter';
/**
 * Create an instance of the express app
 * @type {Object}
 */
/**
 * Dependencies declared
 */
var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/')));
/**
 * Parse incoming requests data, this will happen on every request
 */
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
/**
 * Disables logging server information
 */
app.disable('x-powered-by');
/**
 * log request to the console
 */
app.use((0, _morgan2.default)('dev'));
/**
 * Hot reloading
 */

if (process.env.NODE_ENV !== 'production') {
  var webpackConfig = require('../../webpack.config');
  var compiler = (0, _webpack2.default)(webpackConfig);
  app.use((0, _webpackDevMiddleware2.default)(compiler));
  app.use((0, _webpackHotMiddleware2.default)(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
}
/**
 * Routes
 */
app.use('/users', _UserRouter2.default);
app.use('/documents', _DocumentRouter2.default);
app.use('/roles', _RoleRouter2.default);
// app.use('/search', searchRouter);
app.get('*', function (request, response) {
  response.status(200).sendFile(_path2.default.join(__dirname, '../../client/Index.html'));
});

exports.default = app;