import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import setAuthorizationToken from '../utils/setAuthorizationToken';
// import * as types from './ActionType';
/**
 * Dispatch action to sign up a user
 * @param {Object} userData
 * @returns {Object} function
 */
const signupRequest = (userData) => {
  return (dispatch) => {
    return axios.post('/users', userData);
  };
};

export default signupRequest;
