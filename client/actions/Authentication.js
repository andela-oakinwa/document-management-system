import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import * as types from './ActionType';


/**
 * Dispatch action to logout a user
 * @returns {Object} function
 */
const logout = () => {
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
const login = (data) => {
  return dispatch =>
     axios.post('/users/login', data)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: types.SET_CURRENT_USER,
          user: jwt.decode(token),
        });
      });
};

export { logout, login };
