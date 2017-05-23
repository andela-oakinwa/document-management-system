import axios from 'axios';
import { GET_CURRENT_USER } from './ActionType';

const getUser = (userId) => {
  return (dispatch) => {
    return axios.get(`/users/${userId}`);
  };
};

const updateUser = (data, userID) => {
  return (dispatch) => {
    return axios.put(`/users/${userID}`, data);
  };
};

export { getUser, updateUser };
