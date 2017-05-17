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
      searchResult,
    };
  },
/**
 * Dispatch action to search a document
 * @param {Object} queryString
 * @returns {Object} function
 */
  searchDocument = (queryString) => {
    return (dispatch) => {
      return axios.get(`/search/documents?q=${queryString}`)
        .then((res) => {
          dispatch(documentsSearched(res.data.rows));
          dispatch({
            type: types.SET_PAGINATION,
            pagination: res.data.pagination
          });
        });
    };
  };

export { documentSearched, searchDocument };
