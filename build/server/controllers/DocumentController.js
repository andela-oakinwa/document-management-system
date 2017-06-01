'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../helpers/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Document Controller
 */
/**
 * Dependencies declared
 */
var DocumentController = {
  /**
   * Create a new document
   * Route: POST /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  createDocument: function createDocument(request, response) {
    var _request$body = request.body,
        title = _request$body.title,
        content = _request$body.content,
        access = _request$body.access,
        ownerId = request.tokenDecode.userId,
        ownerRoleId = request.tokenDecode.roleId;

    _models2.default.Document.create({ title: title, content: content, access: access, ownerId: ownerId, ownerRoleId: ownerRoleId }).then(function (createdDoc) {
      createdDoc = _Helper2.default.getDocument(createdDoc);
      response.status(201).send({
        message: 'Your document was created succesfully.',
        createdDoc: createdDoc
      });
    }).catch(function (error) {
      response.status(500).send({
        message: error.message
      });
    });
  },

  /**
   * Get a document by Id
   * Route: GET /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  getDocument: function getDocument(request, response) {
    _models2.default.Document.findById(request.params.id).then(function (searchedDoc) {
      if (!searchedDoc) {
        return response.status(404).send({
          message: 'Document with id:' + request.params.id + ' does not exist.'
        });
      }
      if (searchedDoc.access === 'public' || searchedDoc.ownerId === request.decoded.userId) {
        return response.status(200).send({
          message: 'Document retrieved succesfully.',
          searchedDoc: searchedDoc
        });
      }
      response.status(500).send({
        message: 'Document is private'
      });
    }).catch(function (error) {
      response.status(500).send({
        message: error.message
      });
    });
  },

  /**
   * Gets instances of all document
   * Route: GET /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  getAllDocuments: function getAllDocuments(request, response) {
    var dbQuery = {
      where: {
        $or: [{ access: 'public' }, { ownerId: request.tokenDecode.userId }]
      },
      include: [_models2.default.User],
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'ASC']]
    };
    _models2.default.Document.findAndCountAll(dbQuery).then(function (documents) {
      var constraint = {
        count: documents.count,
        limit: dbQuery.limit,
        offset: dbQuery.offset
      };
      delete documents.count;
      var paging = _Helper2.default.paging(constraint);
      response.status(200).send({
        message: 'You have successfully retrieved all documents.',
        documents: documents,
        paging: paging
      });
    });
  },

  /**
   * Updates a document/document attributes by Id
   * Route: PUT /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   */
  updateDocument: function updateDocument(request, response) {
    _models2.default.Document.findById(request.params.id).then(function (updatedDocument) {
      response.status(200).send({
        message: 'This document has been updated successfully.',
        updatedDocument: updatedDocument
      });
    }).catch(function (error) {
      response.status(500).send({
        message: error.message
      });
    });
  },

  /**
   * Delete document by Id
   * Route: DELETE /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  deleteDocument: function deleteDocument(request, response) {
    _models2.default.Documents.findById(request.params.id).then(function (document) {
      if (!document) {
        return response.status(404).send({
          message: 'Document with id:' + params.id + ' does not exist'
        });
      }
      if (document.ownerId === request.tokenDecode.userId || request.tokenDecode.roleId === 1) {
        document.destroy().then(function () {
          response.status(200).send({
            message: 'Document deleted succesfully'
          });
        });
      } else {
        return response.status(403).send({
          message: 'Document does not belong to you. You cannot delete it.'
        });
      }
    }).catch(function (error) {
      response.status(500).send({
        message: error.message
      });
    });
  }
};

exports.default = DocumentController;