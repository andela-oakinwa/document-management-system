import axios from 'axios';
import jwt from 'jsonwebtoken';
import errorMessage from '../utilities/message';
import setAuthorizationToken from '../utilities/SetAuthorizationToken';
import * as types from './ActionType';
/**
 * Sends action for user sign up
 * @param {Object} userData Data from the client form
 * @returns {Object}
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
      })
      .catch((error) => {
        dispatch(errorMessage(error.response.data.message));
      });
  };
};

export default signupRequest;
