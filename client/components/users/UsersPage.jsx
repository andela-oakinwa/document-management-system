import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-materialize';
import UsersList from './UsersList';
import { fetchUsers, deleteUser } from '../../actions/UserAction';
import Search from '../shared/SearchBox';
import { searchUsers } from '../../actions/Search';
/**
 * Defined as class component
 */
class UsersPage extends Component {
  /**
   * Instantiates the class with default properties
   */
  constructor(props) {
    super(props);
    this.state = {
      renderedUsers: props.users,
      filtered: false
    };

    this.displayUsers = this.displayUsers.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  /**
   * Fetches list of users
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
   * Handles search feature
   * @param  {Object} event Events from user input
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    this.props.searchUsers(query);
    const userSearchResult = this.props.search;
    if (query.trim().length > 0) {
      this.setState({ renderedUsers: userSearchResult });
    }
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    const { totalCount, pageSize, currentPage, pageCount }
      = this.props.metadata;
    // if (this.props.search.length > 0) {

    // }
    return (
      <div className="container">
        <h5 className="center">Registered Users</h5>
        <div className="col s7 push-s4">
            <Search onChange={this.handleSearch} />
        </div>
        <UsersList
          users={
            this.props.search.length > 0
            ?
            this.props.search
            :
            this.props.users
          }
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
  search: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  searchUsers: React.PropTypes.func.isRequired,
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
  let users = [];
  users = state.users;
  return {
    users,
    search: state.search,
    auth: state.auth,
    metadata: state.paginate,
  };
};

export default connect(mapStateToProps,
{ fetchUsers, deleteUser, searchUsers })(UsersPage);
