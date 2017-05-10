/**
 * Dependencies declared
 */
import express from 'express';
import RoleController from '../controllers/RoleController';
import Authentication from '../middlewares/Authentication';
/**
 * Router for roles
 * @type {Object}
 */
const roleRouter = express.Router();
/**
 *Routes to create and retrieve roles
 */
roleRouter.route('/')
  .post(Authentication.verifyToken,
    Authentication.checkAdminRights,
    RoleController.createRole)
  .get(Authentication.verifyToken,
    Authentication.checkAdminRights,
    RoleController.getAll);
/**
 * Routes for accessing, creating and deleting role
 */
roleRouter.route('/:id')
  .put(Authentication.verifyToken,
    Authentication.checkAdminRights,
    RoleController.updateRole)
  .get(Authentication.verifyToken,
    Authentication.checkAdminRights,
    )
  .delete();

export default roleRouter;
