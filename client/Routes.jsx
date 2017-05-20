import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage'; 
import NavigationBar from './components/navigation_bar/NavigationBar';
import SignUpPage from './components/signup/SignUpPage';
import About from './components/About';
import Login from './components/login/LoginPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='/signup' component={SignUpPage} />
    <Route path='/about' component={About} />
    <Route path='/login' component={Login} />
  </Route>
);

