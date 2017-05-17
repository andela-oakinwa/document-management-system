import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import getUser, { updateUser } from '../../actions/profileActions';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getUser(this.props.userId).then((res) => {
      this.setState({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        username: res.data.username,
        email: res.data.email,
        password: res.data.password
      });
    });
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state, this.props.userId)
      .then(
        () => {
          this.context.router.push('/');
        }
      );
  }

  render() {
    return (
      <div>
        <ProfileForm
          userProps={this.state}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  userId: React.PropTypes.number.isRequired,
  getUser: React.PropTypes.func.isRequired,
  updateUser: React.PropTypes.func.isRequired
};

ProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    userId: state.auth.user.userId,
  };
}

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
