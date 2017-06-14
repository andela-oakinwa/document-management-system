import axios from 'axios';
import * as types from './ActionType';

/**
 * Dispatch action to fetch users
 * @param {number} offset Output paging offset
 * @returns {Object}
 */
const fetchUsers = (offset) => {
    const pageOffset = offset || 0,
      limit = 5;
    return (dispatch) => {
      return axios.get(`/users/?offset=${pageOffset}&limit=${limit}`)
        .then((response) => {
          dispatch({
            type: types.SET_USERS,
            users: response.data.users.rows
          });
          dispatch({
            type: types.SET_PAGINATION,
            pagination: response.data.paging
          });
        });
    };
  },
/**
 * Dispatch action to fetch a user
 * @param {Object} id Specific user ID
 * @returns {Object}
 */
  fetchUser = (id) => {
    return (dispatch) => {
      return axios.get(`/users/${id}`)
        .then(response => dispatch({
          type: types.LOAD_USER,
          user: response.data.users.rows,
        }));
    };
  },
/**
 * Dispatch action to update a user
 * @param {Object} user User object
 * @param {Object} userId User's userId
 * @returns {Object}
 */
  updateUser = (user) => {
    return (dispatch) => {
      return axios.put(`/users/${user.id}`, user)
        .then(response => dispatch({
          type: types.UPDATE_USER,
          user: response.data.users.rows,
        }));
    };
  },
/**
 * Dispatches action for delete
 * @param {Object} id User ID
 * @returns {Object}
 */
  deleteUser = (id) => {
    return (dispatch) => {
      return axios.delete(`/users/${id}`)
        .then((response) => {
          dispatch({
            type: types.DELETE_USER,
            user: response.data.users.rows
          });
          dispatch(fetchUsers());
        }
        );
    };
  };

export { fetchUsers, fetchUser, updateUser, deleteUser };
