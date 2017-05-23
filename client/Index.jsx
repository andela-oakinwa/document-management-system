import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

// import './style/Index.scss';
import setAuthorizationToken from './utilities/SetAuthorizationToken';
import routes from './Routes';
import * as types from './actions/ActionType';
import rootReducer from './reducers/RootReducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch({
    type: types.SET_CURRENT_USER,
    user: jwt.decode(localStorage.jwtToken)
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('main-app')
);
