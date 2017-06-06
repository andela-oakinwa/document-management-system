import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import EditUserRole from './EditUserRole';
import * as allActions from '../../actions/UserAction';
/**
 * ListRow defined as class component. It's a root component
 */
class ListRow extends Component {
  /**
   * Class constructor
   * @param  {Object} props Component property
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      user: Object.assign({}, props.user),
    };
    this.onChange = this.onChange.bind(this);
  }
  /**
   * Handles change of state
   */
  onChange(event) {
    event.preventDefault();
    const field = event.target.name,
      user = this.state.user;
    user[field] = event.target.value;
    this.setState({ user });
    this.props.actions.updateUser(user);
  }
  /**
   * renders to the DOM
   * @return {Object}
   */
  render() {
    const { user, deleteUser, authenticate } = this.props;
    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{auth.user.roleId !== user.roleId ? <EditUserRole
          value={parseInt(this.state.user.roleId, 10)}
          onChange={this.onChange} /> : <span>{user.Role.title}</span>
          }
        </td>
        <td>{user.createdAt.substr(0, 10)}</td>
        <td>{authenticate.user.userId !== user.id &&
          <Link to="/user" onClick={deleteUser(user.id)}>Delete</Link>
          }
        </td>
      </tr>
    );
  }
}

ListRow.propTypes = {
  user: React.PropTypes.object.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  authenticate: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};
/**
 * Maps state to component properties
 * @param {Object} release
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(allActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(ListRow);
