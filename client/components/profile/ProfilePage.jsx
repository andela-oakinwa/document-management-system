import { connect } from 'react-redux';
import React, { Component } from 'react';
import ProfileForm from './ProfileForm';
import getUser, { updateUser } from '../../actions/Profile';
/**
 * Class component as this is a root component
 */
class ProfilePage extends Component {
  /**
   * Constructor containing component states
   * @param {Object} props Property object
   */
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
  /**
   * Checks for mounted details
   */
  checkMount() {
    this.props.getUser(this.props.userId)
      .then((response) => {
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          username: response.data.username,
          email: response.data.email,
          password: response.data.password
        });
      });
  }
  /**
   * Handles change of state as a result of user input
   * @param {Object} event Event object trigered by user
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * Handles submit events
   * @param {Object} event Event trigered by user
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state, this.props.userId)
      .then(
        () => {
          this.context.router.push('/');
        }
      );
  }
  /**
   * Render to the DOM
   */
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

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.userId,
  };
};

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
