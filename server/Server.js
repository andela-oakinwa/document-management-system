/**
 * Entry point for Document Manangement System
 */
import http from 'http';
import logger from 'js-logger';
import * as dotenv from 'dotenv';

import app from './config/App';

/**
 * Disables logging error
 * @type {Object}
 */
dotenv.config({
  silent: true
});
/**
 * Define server port
 */
const port = process.env.PORT || 4000;

logger.useDefaults();
app.set('port', port);
/**
 * Creates server from import
 */
const server = http.createServer(app);
server.listen(port);
logger.info(`App is running at: ${port}/`);
