import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import signupRequest from '../../actions/SignUpAction';

class SignUpPage extends React.Component {
  render() {
    const { signupRequest } = this.props;
    return (
      <div className="row">
        <div className="col s8 offset-s2">
          <SignUpForm signupRequest={signupRequest} />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  signupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { signupRequest })(SignUpPage);
