import axios from 'axios';
import * as types from './ActionType';

/**
 * Dispatches action to create a new document
 * @param {Object} data
 * @returns {Object}
 */
const saveDocument = (data) => {
    return (dispatch) => {
      return axios.post('/documents', data)
         .then((response) => {
           dispatch({
             type: types.CREATE_DOCUMENT,
             document: response.data
           });
         });
    };
  },
  /**
   * Dispatches action to fetch all documents
   * @param {Object} offset Paging offset
   * @returns {Object}
   */
  fetchDocuments = (offset) => {
    const pageOffset = offset || 0;
    const limit = 6;
    return (dispatch) => {
      return axios.get(`/documents/?offset=${pageOffset}&limit=${limit}`)
        .then((response) => {
          dispatch({
            type: types.SET_DOCUMENTS,
            documents: response.data.documents.rows
          });
          dispatch({
            type: types.SET_PAGINATION,
            pagination: response.data.paging
          });
        });
    };
  },
  /**
   * Action to fetch a specific document
   * @param {Object} id Document Id
   * @returns {Object}
   */
  fetchDocument = (id) => {
    return (dispatch) => {
      return axios.get(`/document/${id}`)
        .then((response) => {
          dispatch({
            type: types.LOAD_DOCUMENT,
            document: response.data,
          });
        });
    };
  },
  /**
   * Action to edit a specific document
   * @param {Object} data Document data
   * @returns {Object}
   */
  updateDocument = (data) => {
    return (dispatch) => {
      return axios.put(`/document/${data.id}`, data)
        .then((response) => {
          dispatch({
            type: types.UPDATE_DOCUMENT,
            document: response.data,
          });
        });
    };
  },
  /**
   * Action to delete a specific document
   * @param {Object} id Document Id
   * @returns {Object}
   */
  deleteDocument = (id) => {
    return (dispatch) => {
      return axios.delete(`/documents/${id}`)
        .then(() => {
          dispatch({
            type: types.DELETE_DOCUMENT,
            documentId: id,
          });
        });
    };
  };

export { saveDocument, fetchDocument, fetchDocuments,
  updateDocument, deleteDocument };

