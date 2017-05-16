import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './types';


/**
 * Dispatch action to logout a user
 * @returns {Object} function
 */
export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch({
      type: types.SET_CURRENT_USER,
      user: {}
    });
    dispatch({
      type: types.SET_DOCUMENTS,
      documents: [],
    });
  };
};

/**
 * Dispatch action to login a user
 * @param {any} data
 * @returns {Object} function
 */
export const login = (data) => {
  return dispatch =>
     axios.post('/users/login', data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: types.SET_CURRENT_USER,
          user: jwt.decode(token),
        });
      });
};
