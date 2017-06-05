import React from 'react';
import UserRow from './UserRow';
/**
 * Functional component as this is chile component of UsersPage
 */
const UsersList = () => {
  const usersRow = users.map((user) => {
    <UserRow
      user={user}
      key={user.id}
      deleteUser={deleteUser}
      authenticate={auth}
      />;
  });
  return (
    <table className="responsive-table striped">
      <thead>
        <th>UserName</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Date Joined</th>
        <th>Delete</th>
      </thead>
      <tbody>
        {usersRow}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  users: React.PropTypes.array.isRequired,
  deleteUser: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
};

export default UsersList;
