import * as types from '../actions/ActionType';

const documents = (state = [], action = {}) => {
  switch (action.type) {
  case types.CREATE_DOCUMENT:
    return [...state, Object.assign({}, action.document)];
  case types.LOAD_DOCUMENT:
    return [
      ...state.filter(document => document.id !== action.document.id),
      Object.assign({}, action.document)
    ];
  case types.UPDATE_DOCUMENT:
    return [
      ...state.filter(document => document.id !== action.document.id),
      Object.assign({}, action.document)
    ];
  case types.DELETE_DOCUMENT:
    return [
      ...state.filter(document => document.id !== action.documentId),
    ];
  case types.SET_DOCUMENT:
    return action.documents;

  default: return state;
  }
};

export default documents;
