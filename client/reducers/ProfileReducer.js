import { SET_USER_ID, GET_CURRENT_USER } from '../actions/ActionType';

const user = (state = {}, action = {}) => {
  switch (action.type) {
  case GET_CURRENT_USER: {
    return Object.assign({}, action.user);
  }
  case SET_USER_ID:
    return [
      ...state,
      action.id
    ];
  default: return state;
  }
};

export default user;
