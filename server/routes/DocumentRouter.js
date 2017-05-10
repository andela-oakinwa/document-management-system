import express from 'express';
import DocumentController from '../controllers/DocumentController';
import Authentication from '../middlewares/Authentication';

const documentRouter = express.Router();
/**
 * Default routes for creating document
 */
documentRouter.route('/')
  .post(Authentication.verifyToken,
    Authentication.validateDocumentInput,
    DocumentController.create)
  .get(Authentication.verifyToken,
    Authentication.verifySearch,
    DocumentController.getAll);
/**
 * Routes to retrieve document
 */
documentRouter.get('./search',
  Authentication.verifyToken,
  Authentication.verifySearch,
  DocumentController.search);
/**
 * Routes for retrieving, updating and deleting document
 */
documentRouter.route('/:id')
  .get(Authentication.verifyToken,
    Authentication.getDocument,
    DocumentController.getDocument)
  .put(Authentication.verifyToken,
    Authentication.checkDocumentPermission,
    DocumentController.update)
  .delete(Authentication.verifyToken,
    Authentication.checkDocumentPermission,
    DocumentController.delete);

export default documentRouter;
