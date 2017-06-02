import axios from 'axios';
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
          user: response.data.users.id
        });
      });
  };
};
/**
 * Updates user
 * @param  {Object} data
 * @param  {Number} userID
 * @return {Object}
 */
const updateUser = (data, userID) => {
  return (dispatch) => {
    return axios.put(`/users/${userID}`, data)
      .then((response) => {
        dispatch({
          type: types.UPDATE_USER,
          user: response.data
        });
      });
  };
};

export { getUser, updateUser };
