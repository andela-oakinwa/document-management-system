/**
 * Dependencies declared
 */
import express from 'express';
import SearchController from '../controllers/SearchController';
import Authentication from '../middlewares/Authentication';
/**
 * Routes for search
 */
const searchRoute = express.Router();
/**
 * Search for user(s)
 */
searchRoute.route('/users')
  .get(Authentication.verifyToken, SearchController.searchUser);
/**
 * Search for document(s)
 */
searchRoute.route('/documents')
  .get(Authentication.verifyToken, SearchController.searchDocument);
