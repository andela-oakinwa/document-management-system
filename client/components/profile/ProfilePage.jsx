import { connect } from 'react-redux';
import React, { Component } from 'react';
import toastr from 'toastr';
import ProfileForm from './ProfileForm';
import { getUser, updateUser } from '../../actions/Profile';
/**
 * Class component
 */
class ProfilePage extends Component {
  /**
   * Constructor containing component states
   * @param {Object} props Property object
   */
  constructor(props) {
    super(props);
    this.state =
    {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * Called after redering
   */
  componentWillMount() {
    this.props.getUser(this.props.userId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }
  /**
   * Handles change of state as a result of user input
   * @param {Object} event Event object trigered by user
   */
  onChange(event) {
    const field = event.target.id;
    const user = this.state.user;
    user[field] = event.target.value;
    return this.setState({ user });
  }
  /**
   * Handles submit events
   * @param {Object} event Event trigered by user
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.updateUser(this.state.user, this.props.userId)
      .then(
        () => {
          this.context.router.push('/');
          toastr.success('Profile updated successfully!');
        }
      );
  }
  /**
   * Render to the DOM
   * @return {Object}
   */
  render() {
    const user = this.state.user;
    return (
      <div>
        <ProfileForm
          userProps={user}
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
/**
 * Maps state to properties
 * @param  {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.userId,
    user: state.user
  };
};

export default connect(mapStateToProps, { getUser, updateUser })(ProfilePage);
