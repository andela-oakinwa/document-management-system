/**
 * Dependencies declared
 */
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';


// Create an instance of the express app
const app = express();

// Disables logging sensitive info to the URL
app.disable('x-powered-by');

// Log requests to the console.
app.use(logger('Dev'));

// Parse incoming requests data, this will happen on every request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
