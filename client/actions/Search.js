import axios from 'axios';
import * as types from './ActionType';
/**
 * Dispatch action for search result
 * @param  {Object} searchResult
 * @return {Object}
 */
const documentSearched = (searchResult) => {
    return {
      type: types.SEARCH_RESULTS,
      searchResult
    };
  },
  userSearched = (searchResult) => {
    return {
      type: types.SEARCH_RESULTS,
      searchResult
    };
  },
/**
 * Dispatch action to search a document
 * @param {Object} queryString
 * @returns {Object}
 */
  searchDocuments = (queryString) => {
    return (dispatch) => {
      return axios.get(`/documents/search/documents?q=${queryString}`)
        .then((response) => {
          dispatch(documentSearched(response.data.rows));
          dispatch({
            type: types.SET_PAGINATION,
            pagination: response.data.pagination
          });
        });
    };
  },
  /**
   * Dispatch action to search a user
   * @param {Object}
   */
  searchUsers = (queryString) => {
    return (dispatch) => {
      return axios.get(`/users/search/users?q=${queryString}`)
        .then((response) => {
          if (!queryString) {
            dispatch(userSearched([]));
          }
          dispatch(userSearched(response.data.rows));
          dispatch({
            type: types.SET_PAGINATION,
            pagination: response.data.pagination
          });
        });
    };
  };

export { documentSearched, searchDocuments, userSearched, searchUsers };
