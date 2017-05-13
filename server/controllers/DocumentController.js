/**
 * Dependencies declared
 */
import db from '../models/Index';
import Helper from '../helpers/Helper';
/**
 * Document Controller
 */
const DocumentController = {

  /**
   * Create a new document
   * Route: POST /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
   */
  createDocument(request, response) {
    db.Document
      .create(request.documentInput)
        .then((content) => {
          content = Helper.getDocument(content);
          response.status(201)
            .send({
              message: 'Your document was created succesfully.',
              content
            });
        })
        .catch(error => response.status(500)
          .send(error.errors));
  },
  /**
   * Get a document by Id
   * Route: GET /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  getDocument(request, response) {
    const content = Helper.getDocument(request.singleDocument);
    return response.status(200)
      .send({
        message: 'This document was retrieved succesfully.',
        content
      });
  },
  /**
   * Gets instances of all document
   * Route: GET /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  getAllDocuments(request, response) {
    request.doqmanFilter.attributes = Helper.getDocumentAttr();
    db.Document
      .findAndCountAll(request.doqmanFilter)
      .then((documents) => {
        const constraint = {
          count: documents.count,
          limit: request.doqmanFilter.limit,
          offset: request.doqmanFilter.offset
        };
        delete documents.count;
        const paging = Helper.paging(constraint);
        response.status(200)
          .send({
            message: 'You have successfully retrieved all documents.',
            documents,
            paging
          });
      });
  },
  /**
   * Updates a document/document attributes by Id
   * Route: PUT /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  updateDocument(request, response) {
    request.documentInstance.update(request.body)
      .then((updatedDocument) => {
        response.status(200)
          .send({
            message: 'This document has been updated successfully.',
            updatedDocument
          });
      })
      .catch((error) => {
        response.status(500).send(error.errors);
      });
  },
  /**
   * Delete document by Id
   * Route: DELETE /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  deleteDocument(request, response) {
    return request.body.document.destroy()
      .then(() => {
        response.status(200)
        .send({
          message: `Document with id:${request.params.id} has been deleted` });
      });
  }
};

export default DocumentController;