'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Role Controller
 */
var RoleController = {
  /**
   * Creates a new role
   * Route: POST: /roles/
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  createRole: function createRole(request, response) {
    _models2.default.Role.create(request.body).then(function (role) {
      response.status(201).send({
        message: 'Role was created successfully',
        role: role
      });
    }).catch(function (error) {
      response.status(400).send({
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
  updateRole: function updateRole(request, response) {
    _models2.default.Role.findById(request.params.id).then(function (updatedRole) {
      response.status(200).send({
        message: 'Role was updated successfully.',
        updatedRole: updatedRole
      });
    }).catch(function () {
      response.status(404).send({
        message: 'Role with id: ' + request.params.id + ' not found'
      });
    });
  },

  /**
   * Delete a Role
   * Route: DELETE: /roles/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  deleteRole: function deleteRole(request, response) {
    _models2.default.Role.findById(request.params.id).then(function (role) {
      if (!role) {
        return response.status(404).send({
          message: 'Role with id: ' + request.params.id + ' not found'
        });
      }
      role.destroy().then(function () {
        response.status(200).send({
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
  getRole: function getRole(request, response) {
    _models2.default.Role.findById(request.params.id).then(function (role) {
      if (!role) {
        return response.status(404).send({
          message: 'Role does not exist.'
        });
      }
      response.status(200).send({
        message: 'Role was retrieved successfully.',
        role: role
      });
    }).catch(function () {
      response.status(500).send({
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
  getAllRole: function getAllRole(request, response) {
    _models2.default.Role.findAll().then(function (roles) {
      response.status(200).send({
        message: 'You have successfully retrieved all roles.',
        roles: roles
      });
    }).catch(function (error) {
      response.status(500).send({
        message: error.message
      });
    });
  }
}; /**
    * Dependencies declared
    */
exports.default = RoleController;