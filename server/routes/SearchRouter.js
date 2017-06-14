/**
 * Dependencies declared
 */
import express from 'express';
import SearchController from '../controllers/SearchController';
import Authentication from '../middlewares/Authentication';
/**
 * Routes for search
 */
const searchRouter = express.Router();
/**
 * Search for user
 */
searchRouter.get('/users',
Authentication.verifyToken, SearchController.searchUser);
/**
 * Search for document(s)
 */
searchRouter.get('/documents',
Authentication.verifyToken, SearchController.searchDocument);
