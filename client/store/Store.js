import { createStore } from 'redux';
import rootReducer from '../reducers/RootReducer';

export default(initialState) => {
  return createStore(rootReducer, initialState);
};
