import React from 'react';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';
import { userSignupRequest } from '../../actions/SignUpAction';

class SignUpPage extends React.Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div>
          <SignUpForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest  })(SignUpPage);
