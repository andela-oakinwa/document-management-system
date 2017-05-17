/**
 * Dependencies declared
 */
import db from '../models';
import Helper from '../helpers/Helper';
/**
 * Role Controller
 */
const RoleController = {
  /**
   * Creates a new role
   * Route: POST: /roles/
   * @param {Object} request Request object
   * @param {Object} reponse Response object
   * @returns {Object} Response object
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
            errorType: Helper.errorType(error)
          });
      });
  },
  /**
   * Update roles
   * Route: PUT: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
   */
  updateRole(request, response) {
    request.roleInstance.update(request.body)
      .then((updatedRole) => {
        response.status(200)
          .send({
            message: 'Role was updated successfully.',
            updatedRole
          });
      })
      .catch((error) => {
        response.status(400)
          .send({
            errorType: Helper.errorType(error)
          });
      });
  },
  /**
   * Delete a Role
   * Route: DELETE: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
   */
  deleteRole(request, response) {
    request.roleInstance.destroy()
      .then(() => {
        response.status(200)
          .send({ message: 'This role has been deleted.' });
      });
  },
  /**
   * Get role by id
   * Route: GET: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
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
            message: 'This role was retrieved successfully.',
            role
          });
      });
  },
  /**
   * Get all roles
   * Route: GET: /roles/
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
   */
  getAllRole(request, response) {
    db.Role
      .findAll()
      .then((roles) => {
        response.status(200)
          .send({
            message: 'You have successfully retrieved all roles.',
            roles
          });
      });
  }
};

export default RoleController;
