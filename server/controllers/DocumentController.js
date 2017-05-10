/**
 * Document Controller
 */
import db from '../models';
import Helper from '../helpers/Helper';

const DocumentController = {

  /**
   * Create a new document
   * Route: POST /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {Object} Response object
   */
  create(request, response) {
    db.Document
      .create(request.documentInput)
        .then((document) => {
          document = Helper.getDocument(document);
          response.status(201)
            .send({
              message: 'Your document was created succesfully.',
              document
            });
        })
        .catch(error => response.status(500).send(error.errors));
  },
  /**
   * Get a document by Id
   * Route: GET /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  getDocument(request, response) {
    const document = Helper.getDocument(request.singleDocument);
    return response.status(200)
      .send({
        message: 'This document was retrieved succesfully',
        document
      });
  },
  /**
   * Gets instances of all document
   * Route: GET /documents/
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  getAllDocument(request, response) {
    
  
  },
  /**
   * Updates a document/document attributes by Id
   * Route: PUT /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  update(request, response) {
    request.documentInstance.update()
    
  }, 
  /**
   * Delete document by Id
   * Route: DELETE /documents/:id
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @return {Object} Response object
   */
  delete() {

  }

};

export default DocumentController;
