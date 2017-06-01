import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import LandingPage from './components/LandingPage'; 
import NavigationBar from './components/shared/NavigationBar';
import SignUpPage from './components/signup/SignUpPage';
import About from './components/About';
import Login from './components/login/LoginPage';
import ManageDocumentPage from './components/document/ManageDocumentPage';
import UsersPage from './components/users/UsersPage';
import DocumentDetailsPage from './components/document/DocumentDetailsPage';
import ProfilePage from './components/profile/ProfilePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='/signup' component={SignUpPage} />
    <Route path='/about' component={About} />
    <Route path='/login' component={Login} />
    <Route path="/document" component={ManageDocumentPage} />
    <Route path="/document/:id" component={ManageDocumentPage} />
    <Route path="/users" component={UsersPage} />
    <Route path="/document-details/:id" component={DocumentDetailsPage} />
    <Route path="/editprofile" component={ProfilePage} />
  </Route>
);
