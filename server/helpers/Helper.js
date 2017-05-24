/**
 * Handles data retrival and presentation
 * @type {Object}
 */
const Helper = {
  userProfile(user) {
    const attributes = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roleId: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return attributes;
  },
  getUserAttribute() {
    return [
      'id',
      'username',
      'firstName',
      'lastName',
      'email',
      'roleId',
      'createdAt',
      'updatedAt'
    ];
  },
  paging(constraint) {
    const nextPage = Math.ceil(constraint.count / constraint.limit),
      currentPage = Math.floor((constraint.offset / constraint.limit) + 1),
      pageSize = constraint.limit > constraint.count
        ? constraint.count : constraint.limit;
    return {
      pageCount: nextPage,
      currentPage,
      pageSize: Number(pageSize),
      totalCount: constraint.count
    };
  }
};

export default Helper;
