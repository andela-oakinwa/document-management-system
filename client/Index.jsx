import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';

import './style/Index.scss';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/material-icons/css/material-icons.css';
import configureStore from './store/Store';
import setAuthorizationToken from './utilities/SetAuthorizationToken';
import routes from './Routes';
import * as types from './actions/ActionType';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch({
    type: types.SET_CURRENT_USER,
    user: jwt.decode(localStorage.jwtToken)
  });
}
/**
 * Renders to the DOM
 */
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('main-app')
);
