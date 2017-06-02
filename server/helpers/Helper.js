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
   * Gets document attributes
   * @param  {Object} createdDoc
   * @return {Array}
   */
  getDocument(createdDoc) {
    return {
      id: createdDoc.id,
      title: createdDoc.title,
      content: createdDoc.content,
      access: createdDoc.access,
      ownerId: createdDoc.ownerId,
      createdAt: createdDoc.createdAt,
      updatedAt: createdDoc.updatedAt
    };
  },
  /**
   * Get document properties
   * @return {Array}
   */
  getDocumentAttr() {
    return [
      'id',
      'title',
      'content',
      'access',
      'ownerId',
      'createdAt',
      'updatedAt'
    ];
  },
  /**
   * Gets document owner detials
   * @return {Array} Array of objects
   */
  ownerDetails() {
    return [
      {
        model: User,
        as: 'Owner',
        attributes: [
          'username',
          'firstName',
          'lastName',
          'email'
        ]
      }
    ];
  }
};

export default Helper;
