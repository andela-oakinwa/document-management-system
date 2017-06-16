import axios from 'axios';
import errorMessage from '../utilities/message';
import * as types from './ActionType';

/**
 * Fetches a single user
 * @param  {Number} userId
 * @return {Object}
 */
const getUser = (userId) => {
  return (dispatch) => {
    return axios.get(`/users/${userId}`)
      .then((response) => {
        dispatch({
          type: types.GET_CURRENT_USER,
          user: response.data.user
        });
      })
      .catch((error) => {
        dispatch(errorMessage(error.response.data.message));
      });
  };
};
/**
 * Updates user
 * @param  {Object} data
 * @param  {Number} userId
 * @return {Object}
 */
const updateUser = (data, userId) => {
  return (dispatch) => {
    return axios.put(`/users/${userId}`, data)
      .catch((error) => {
        dispatch(errorMessage(error.response.data.message));
      });
  };
};

export { getUser, updateUser };
