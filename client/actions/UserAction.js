import axios from 'axios';
import * as types from './ActionType';

/**
 * Dispatch action to fetch users
 * @param {number} offset
 * @returns {Array} users
 */
const fetchUsers = (offset) => {
    const pageOffset = offset || 0,
      limit = 5;
    return (dispatch) => {
      return axios.get(`/users?offset=${pageOffset}&limit=${limit}`)
        .then((response) => {
          dispatch({
            type: types.SET_USERS,
            users: response.data.rows,
          });
          dispatch({
            type: types.SET_PAGINATION,
            pagination: res.data.pagination
          });
        });
    };
  },
/**
 * Dispatch action to fetch a user
 * @param {Object} id
 * @returns {Object} function
 */
  fetchUser = (id) => {
    return (dispatch) => {
      return axios.get(`/users/${id}`)
        .then(response => dispatch({
          type: types.LOAD_USER,
          user: response.data,
        }));
    };
  },
/**
 * Dispatch action to update a user
 * @param {Object} user
 * @param {Object} userId
 * @returns {Object} function
 */
  updateUser = (user, userId) => {
    return (dispatch) => {
      return axios.put(`/users/${userId}`, user)
        .then(response => dispatch({
          type: types.UPDATE_USER,
          user: response.data,
        }));
    };
  },
/**
 * Dispatches action for delete
 * @param {Object} id
 * @returns {Object} function
 */
  deleteUser = (id) => {
    return (dispatch) => {
      return axios.delete(`/users/${id}`)
        .then(() => dispatch({
          type: types.DELETE_USER,
          userId: id,
        }));
    };
  };

export { fetchUsers, fetchUser, updateUser, deleteUser };
