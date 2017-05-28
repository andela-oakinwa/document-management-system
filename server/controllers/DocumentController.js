/**
 * Dependencies declared
 */
import db from '../models';
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
   */
  createDocument(request, response) {
    const { title, content, access } = request.body,
      ownerId = request.tokenDecode.userId;
      ownerRoleId = request.tokenDecode.roleId;
      console.log(request.tokenDecode);
    db.Document
      .create({ title, content, access, ownerId, ownerRoleId })
        .then((createdDoc) => {
          createdDoc = Helper.getDocument(createdDoc);
          response.status(201)
            .send({
              message: 'Your document was created succesfully.',
              createdDoc
            });
        })
        .catch((error) => {
          response.status(500)
            .send(error.message);
        });
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
   */
  getAllDocuments(request, response) {
    console.log(request.body);
    const dbQuery = {
      where: {
        $or: [
          { access: 'public' },
          { ownerId: request.tokenDecode.userId }
        ]
      },
      include: Helper.ownerDetails,
      limit: request.dbQuery.limit || 10,
      offset: request.dbQuery.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    db.Document
      .findAndCountAll(dbQuery)
      .then((documents) => {
        const constraint = {
          count: documents.count,
          limit: dbQuery.limit,
          offset: dbQuery.offset
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
   */
  updateDocument(request, response) {
    db.Document.findById(request.params.id)
      .then((updatedDocument) => {
        response.status(200)
          .send({
            message: 'This document has been updated successfully.',
            updatedDocument
          });
      })
      .catch((error) => {
        response.status(500)
          .send(error);
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
          message: 'Document deleted succesfully'
        });
      })
      .catch((error) => {
        response.status(404)
          .send(error);
      });
  }
};

export default DocumentController;
