/**
 * Dependencies declared
 */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';

import userRouter from '../routes/UserRouter';
import roleRouter from '../routes/RoleRouter';
import documentRouter from '../routes/DocumentRouter';
// import searchRouter from '../routes/SearchRouter';
/**
 * Create an instance of the express app
 * @type {Object}
 */
const app = express();

app.use(express.static(path.join(__dirname, '../../client/')));
/**
 * Parse incoming requests data, this will happen on every request
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Disables logging server information
 */
app.disable('x-powered-by');
/**
 * log request to the console
 */
app.use(logger('dev'));
/**
 * Hot reloading
 */
if (process.env.NODE_ENV !== 'production') {
  const webpackConfig = require('../../webpack.config');
  const webpackMiddleware =  require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
}
/**
 * Routes
 */
// app.get('/home', (request, response) => {
//   response.status(200)
//     .send({
//       message: 'Welcome to doqMan Document Management System'
//     });
// });
app.use('/users', userRouter);
app.use('/documents', documentRouter);
app.use('/roles', roleRouter);
// app.use('/search', searchRouter);
app.get('*', (request, response) => {
  response.status(200)
    .sendFile(path.join(__dirname, '../../client/Index.html'));
});

export default app;
