import { combineReducers } from 'redux';
import roles from './RoleReducer';
import users from './UserReducer';
import documents from './DocumentReducer';

export default combineReducers({
  roles,
  users,
  documents
});
