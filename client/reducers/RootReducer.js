import { combineReducers } from 'redux';
import auth from './AuthenticationReducer';
import search from './SearchReducer';
import users from './UserReducer';
import documents from './DocumentReducer';
import paginate from './PaginationReducer';
import user from './ProfileReducer';

export default combineReducers({
  auth,
  documents,
  users,
  search,
  paginate,
  user
});
