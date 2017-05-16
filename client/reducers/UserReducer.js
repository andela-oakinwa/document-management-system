import * as types from '../actions/ActionType';

const userReducer = (state = [], action = {}) {
  switch (action.type) {
    case types.LOAD_USER:
      return [
      ...state, 
      Object.assign({}, action.user),
      ];
    case types.UPDATE_USER:
      return [
        ...state.filter(user => user.id !== action.user.id),
        Object.assign({}, action.user),
      ];
    case types.DELETE_USER:
      return state.filter(item => item.id !== action.userId);
    case types.SET_USERS:
      return action.users;
    default: 
      return state;
  }
};

export default userReducer;
