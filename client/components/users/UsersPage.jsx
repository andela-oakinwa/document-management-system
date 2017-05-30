import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import UsersList from './UsersList';
import { fetchUsers, deleteUser } from '../../actions/UserAction';
/**
 * Defined as class components as this is a root component
 */
class UsersPage extends React.Component {
  /**
   * Instantiates the class with default properties
   */
  constructor() {
    super();
    this.displayUsers = this.displayUsers.bind(this);
  }
  /**
   * Checks for returned list of users
   */
  componentDidMount() {
    this.props.fetchUsers();
  }
  /**
   * Handles list of all users
   * @param  {Number} pageNumber
   */
  displayUsers(pageNumber) {
    const offset = (pageNumber - 1) * this.props.metadata.pageSize;
    this.props.fetchUsers(offset);
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    const { totalCount, pageSize, currentPage, pageCount } = this.props.metadata;
    return (
      <div>
        <h3>Registered Users</h3>
        <UsersList
          users={this.props.users}
          deleteUser={this.props.deleteUser}
          auth={this.props.auth}
        />
        <Pagination
          items={pageCount}
          activePage={currentPage}
          maxButtons={Math.ceil(totalCount / pageSize)}
          onSelect={this.displayUsers}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: React.PropTypes.array.isRequired,
  fetchUsers: React.PropTypes.func.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  metadata: React.PropTypes.object.isRequired
};
/**
 * Maps state to properties
 * @param  {Object} state
 * @return {Object}
 */
const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.auth,
    metadata: state.paginate,
  };
};

export default connect(mapStateToProps, { fetchUsers, deleteUser })(UsersPage);
