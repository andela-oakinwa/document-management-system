import express from 'express';
import DocumentController from '../controllers/DocumentController';
import Authentication from '../middlewares/Authentication';

const documentRouter = express.Router();

documentRouter.route('/')
  .post()
  .get();

documentRouter.get('./search');
  
documentRouter.route()
  .get()
  .put()
  .delete();

export default documentRouter;
