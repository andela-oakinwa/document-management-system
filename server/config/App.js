/**
 * Dependencies called
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import userRouter from '../routes/UserRouter';
import roleRouter from '../routes/RoleRouter';
import documentRouter from '../routes/DocumentRouter';
/**
 * Create an instance of the express app
 * @type {Object}
 */
const app = express();
/**
 * Disables logging server information
 */
app.disable('x-powered-by');

/**
 * Console logs for development purpose.
 */
app.use(logger('dev'));
/**
 * Parse incoming requests data, this will happen on every request
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Homepage route
 * @param  {Object} '/'Root url
 * @param  {Function} Callback
 * @return {Object}
 */
app.get('/', (request, response) => {
  response.status(200)
  .send({ message: 'Welcome to Doqman Document Management System' });
});
app.use('/users', userRouter);
app.use('/documents', documentRouter);
app.use('/roles', roleRouter);

app.get('*', (request, response) => {
  response.status(404).send({ message: 'REQUEST PAGE NOT FOUND.' });
});

export default app;
