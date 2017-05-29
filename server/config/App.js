/**
 * Dependencies declared
 */
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
import userRouter from '../routes/UserRouter';
import roleRouter from '../routes/RoleRouter';
import documentRouter from '../routes/DocumentRouter';
// import searchRouter from '../routes/SearchRouter';
/**
 * Create an instance of the express app
 * @type {Object}
 */
const app = express(),
  compiler = webpack(webpackConfig);
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
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
/**
 * Routes
 */
app.use('/users', userRouter);
app.use('/documents', documentRouter);
app.use('/roles', roleRouter);
// app.use('/search', searchRouter);
app.get('*', (request, response) => {
  response.status(200)
    .sendFile(path.join(__dirname, '../../client/Index.html'));
});

export default app;
