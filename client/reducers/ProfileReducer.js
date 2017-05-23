import { SET_USER_ID } from '../actions/ActionType';

const user = (state = [], action = {}) => {
  switch (action.type) {
  case SET_USER_ID:
    return [
      ...state,
      action.id,
    ];
  default: return state;
  }
};

export default user;
