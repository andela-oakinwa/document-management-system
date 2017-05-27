import axios from 'axios';
/**
 * Set's the authorization token
 * @param  {Object} token Passed token
 * @return {void}
 */
const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthorizationToken;
