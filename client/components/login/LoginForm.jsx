import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router';

const LoginForm = ({ errors, onChange, loginProps, onSubmit }) => {
  return (
    <main className="container">
      <center>
        <h5 className="blue-text darken-3">Please, login into your account</h5>
        <div class="section"></div>
        <div className="container">
          <div className="z-depth-1 grey lighten-4 row card-panel" >
            <form className="col s12" method="post">
              <div className='row'>
                <div className='col s12'>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='email' name='email' id='email' /><i className="small material-icons">email</i>
                  <label htmlFor='email'>Enter your email</label>
                </div>
              </div>

              <div className='row'>
                <div className="input-field col s12">
                  <input className='validate' type='password' name='password' /><i className="small material-icons">lock</i>
                  <label htmlFor='password'>Enter your password</label>
                </div>
                <label style={{float:'right'}}>
                <Link className='pink-text' to='#' style={{fontWeight:"bold"}}>Forgot Password?</Link>
                </label>
              </div>
              <br />
              <center>
                <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect white-text' style={{backgroundColor: '#496AE2'}}>Login</button>
                </div>
              </center>
            </form>
          </div>
        </div>
        <span class="signup-login-form__switch-copy">
          Don’t have an account?
        </span>
        <Link to="/signup"> Create Account</Link>
      </center>
      <div class="section"></div>
      <div class="section"></div>
    </main>  
  );
};

export default LoginForm;
