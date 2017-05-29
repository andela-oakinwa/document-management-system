/**
 * Dependencies declared
 */
import db from '../models';

/**
 * Role Controller
 */
const RoleController = {
  /**
   * Creates a new role
   * Route: POST: /roles/
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  createRole(request, response) {
    db.Role
      .create(request.body)
      .then((role) => {
        response.status(201)
          .send({
            message: 'Role was created successfully',
            role
          });
      })
      .catch((error) => {
        response.status(400)
          .send({
            error: error.message
          });
      });
  },
  /**
   * Update roles
   * Route: PUT: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  updateRole(request, response) {
    db.Role.findById(request.params.id)
      .then((updatedRole) => {
        response.status(200)
          .send({
            message: 'Role was updated successfully.',
            updatedRole
          });
      })
      .catch(() => {
        response.status(404)
          .send({
            message: `Role with id: ${request.params.id} not found`
          });
      });
  },
  /**
   * Delete a Role
   * Route: DELETE: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  deleteRole(request, response) {
    db.Role.findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({
              message: `Role with id: ${request.params.id} not found`
            });
        }
        role.destroy()
          .then(() => {
            response.status(200)
              .send({
                message: 'Role was deleted successfully.'
              });
          });
      });
  },
  /**
   * Get a particular role
   * Route: GET: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  getRole(request, response) {
    db.Role
      .findById(request.params.id)
      .then((role) => {
        if (!role) {
          return response.status(404)
            .send({
              message: 'Role does not exist.'
            });
        }
        response.status(200)
          .send({
            message: 'Role was retrieved successfully.',
            role
          });
      })
      .catch(() => {
        response.status(500)
          .send({
            message: error.message
          });
      });
  },
  /**
   * Get all roles
   * Route: GET: /roles/
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  getAllRole(request, response) {
    db.Role
      .findAll()
      .then((roles) => {
        if (request.tokenDecode.roleId == 1 || )
        response.status(200)
          .send({
            message: 'You have successfully retrieved all roles.',
            roles
          });
      });
  }
};

export default RoleController;
