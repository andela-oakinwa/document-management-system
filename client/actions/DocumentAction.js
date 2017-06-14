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
            document: response.data.createdDoc
          });
        });
  };
};
/**
 * Dispatches action to fetch all documents
 * @param {Object} offset Paging offset
 * @returns {Object}
 */
const fetchDocuments = (offset) => {
  const pageOffset = offset || 0;
  const limit = 6;
  return (dispatch) => {
    return axios.get(`/documents/?offset=${pageOffset}&limit=${limit}`)
      .then((response) => {
        dispatch({
          type: types.SET_DOCUMENTS,
          document: response.data.documents.rows
        });
        dispatch({
          type: types.SET_PAGINATION,
          pagination: response.data.paging
        });
      });
  };
};
/**
 * Action to fetch a specific document
 * @param {Object} id Document Id
 * @returns {Object}
 */
const fetchDocument = (id) => {
  return (dispatch) => {
    return axios.get(`/documents/${id}`)
      .then((response) => {
        dispatch({
          type: types.LOAD_DOCUMENT,
          document: response.data.documents.rows,
        });
      });
  };
};
/**
 * Action to edit a specific document
 * @param {Number} id Document id
 * @param {Object} document Initial data
 * @returns {Object}
 */
const updateDocument = (id, document) => {
  return (dispatch) => {
    return axios.put(`/documents/${id}`, document)
      .then((response) => {
        dispatch({
          type: types.UPDATE_DOCUMENT,
          document: response.data.documents.rows,
        });
      });
  };
};
/**
 * Action to delete a specific document
 * @param {Object} id Document Id
 * @returns {Object}
 */
const deleteDocument = (id) => {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
    .then(() => {
      dispatch(fetchDocuments());
    });
  };
};

export { saveDocument, fetchDocument, fetchDocuments,
  updateDocument, deleteDocument };

