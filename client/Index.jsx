import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
// import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
// import './style/Index.scss';

import routes from './Routes';
// import * as types from './actions/ActionType';
// import rootReducer from './reducers';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('main-app')
);
