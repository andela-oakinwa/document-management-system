/**
 * Dependencies declared
 */
import express from 'express';
import DocumentController from '../controllers/DocumentController';
import Authentication from '../middlewares/Authentication';
/**
 * Document router object
 * @type {Object}
 */
const documentRouter = express.Router();
/**
 * Default routes for creating document
 */
documentRouter.route('/')
  .post(Authentication.verifyToken, DocumentController.createDocument)
  .get(Authentication.verifyToken, DocumentController.getAllDocuments);
/**
 * Routes to retrieve document
 */
documentRouter.get('./search', Authentication.verifyToken);
/**
 * Routes for retrieving, updating and deleting document
 */
documentRouter.route('/:id')
  .get(Authentication.verifyToken, DocumentController.getDocument)
  .put(Authentication.verifyToken, Authentication.verifyOwner,
    DocumentController.updateDocument)
  .delete(Authentication.verifyToken, Authentication.verifyOwner,
    DocumentController.deleteDocument);

export default documentRouter;
