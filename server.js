/**
 * Entry point for Document Manangement System
 */
import http from 'http';
import * as dotenv from 'dotenv';
import logger from 'js-logger';
import app from './server/config/App';
const port = process.env.PORT || 3000;
dotenv.config({
  silent: true
});

logger.useDefaults();
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
logger.info(`App is running at: ${port}/`);
