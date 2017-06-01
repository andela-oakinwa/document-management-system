import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import * as types from './ActionType';


/**
 * Forwards logout actions
 * @returns {Object}
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
 * Forwards login actions
 * @param {Object} data User details
 * @returns {Object}
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
