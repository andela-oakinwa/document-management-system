import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './ActionType';
/**
 * Dispatch action to sign up a user
 * @param {Object} userData
 * @returns {Object} function
 */
const signupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/users', userData)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch({
          type: types.SET_CURRENT_USER,
          user: jwt.decode(token)
        });
      });
  };
};

export default signupRequest;
