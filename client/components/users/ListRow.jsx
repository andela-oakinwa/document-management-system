import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import EditRole from './EditRole';
import * as userActions from '../../actions/UserAction';

class ListRow extends React.Component {
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
   * @return {Object} 
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
        <td>{user.userName}</td>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{auth.user.roleId != user.roleId ? <EditUserRole
          value={parseInt(this.state.user.roleId, 10)}
          onChange={this.onChange} /> : <span>{user.Role.title}</span>
          }
        </td>
        <td>{user.createdAt.substr(0, 10)}</td>
        <td>{authenticate.user.userId !== user.id &&
          <Link to="/users" onClick={() => deleteUser(user.id)}>Delete</Link>
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

const mapToProps= (release) => {
  return {
    actions: bindCreators(userActions, release),
  };
}

export default connect(null, mapToProps)(ListRow);