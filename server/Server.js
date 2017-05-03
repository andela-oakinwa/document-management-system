/**
 * Entry point for Document Manangement System
 */
import http from 'http';
import logger from 'js-logger';
import Sequelize from 'sequelize';
import app from './config/App';

/**
 * Define database connection
 */
const connection = new Sequelize('doqman_test', 'postgres', 'admin', { 
    host: 'localhost',
    dialect: 'postgres'
  }),
  port = process.env.PORT || 3000;

logger.useDefaults();
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
logger.info(`App is running at: ${port}/`);
