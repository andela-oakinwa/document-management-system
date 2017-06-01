import * as types from '../actions/ActionType';

const paginate = (state = {}, action = {}) => {
  switch (action.type) {
  case types.SET_PAGINATION:
    return action.pagination;
  default: return state;
  }
};

export default paginate;
