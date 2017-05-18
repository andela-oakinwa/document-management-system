import React from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router';

const LoginForm = ({ errors, onChange, loginProps, onSubmit }) => {
const loginStyle = {
    display: 'inline-block', 
    padding: {
      paddingTop:32,
      paddingRight:48,
      paddingBottom:0,
      paddingLeft:48
    },
    border: {
      borderWidth:1,
      borderStyle: 'solid',
      borderColor: '#EEE'
    }
};
    
  return (
    <div>
      <center>
        <h5 className="blue-text darken-3">Please, login into your account</h5>
        <div class="section"></div>
        <div className="container">
          <div className="z-depth-1 grey lighten-4 row" style={loginStyle}>
            <form className="col s12" method="post">
              <div className='row'>
                <div className='col s12'>
                </div>
              </div>

              <div className='row'>
                <div className='input-field col s12'>
                  <input className='validate' type='email' name='email' id='email' />
                  <label htmlFor='email'>Enter your email</label>
                </div>
              </div>

              <div className='row'>
                <div className="input-field col s12">
                  <input className='validate' type='password' name='password' />
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
        <Link to="#">Create Account</Link>
      </center>
      <div class="section"></div>
      <div class="section"></div>
    </div>  
  );
};

export default LoginForm;
