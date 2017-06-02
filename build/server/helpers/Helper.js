'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Handles data retrival and presentation
 * @type {Object}
 */
var Helper = {
  /**
   * Gets user profile
   * @param  {Object} user User object
   * @return {Object}
   */
  userProfile: function userProfile(user) {
    var attributes = {
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
  getUserAttribute: function getUserAttribute() {
    return ['id', 'username', 'firstName', 'lastName', 'email', 'roleId', 'createdAt', 'updatedAt'];
  },

  /**
   * Handles paging of output data
   * @param  {Object} constraint
   * @return {Object}
   */
  paging: function paging(constraint) {
    var nextPage = Math.ceil(constraint.count / constraint.limit),
        currentPage = Math.floor(constraint.offset / constraint.limit + 1),
        pageSize = constraint.limit > constraint.count ? constraint.count : constraint.limit;
    return {
      pageCount: nextPage,
      currentPage: currentPage,
      pageSize: Number(pageSize),
      totalCount: constraint.count
    };
  },

  /**
   * Gets document attributes
   * @param  {Object} createdDoc
   * @return {Array}
   */
  getDocument: function getDocument(createdDoc) {
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
  getDocumentAttr: function getDocumentAttr() {
    return ['id', 'title', 'content', 'access', 'ownerId', 'createdAt', 'updatedAt'];
  },

  /**
   * Gets document owner detials
   * @return {Array} Array of objects
   */
  ownerDetails: function ownerDetails() {
    return [{
      model: User,
      as: 'Owner',
      attributes: ['username', 'firstName', 'lastName', 'email']
    }];
  }
};

exports.default = Helper;