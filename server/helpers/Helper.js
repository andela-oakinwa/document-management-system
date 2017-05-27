/**
 * Handles data retrival and presentation
 * @type {Object}
 */
const Helper = {
  /**
   * Gets user profile
   * @param  {Object} user User object
   * @return {Object}
   */
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
  /**
   * Gets user profile properties
   * @return {Array}
   */
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
  /**
   * Handles paging of output data
   * @param  {Object} constraint
   * @return {Object}
   */
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
  },
  /**
   * Gets document
   * @param  {Object} createdDoc
   */
  getDocument(createdDoc) {

  }
};

export default Helper;
