'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _Helper = require('../helpers/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dependencies declared
 */
var SearchController = {
  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {void} no returns
   */
  searchUser: function searchUser(request, response) {
    var query = {
      where: {
        $or: [{
          userName: {
            $iLike: '%' + request.query.q + '%'
          }
        }, {
          firstName: {
            $iLike: '%' + request.query.q + '%'
          }
        }, {
          lastName: {
            $iLike: '%' + request.query.q + '%'
          }
        }, {
          email: {
            $iLike: '%' + request.query.q + '%'
          }
        }]
      },
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    _models2.default.User.findAndCountAll(query).then(function (users) {
      var results = users.rows.map(function (user) {
        return _Helper2.default.userProfile(user);
      });
      var constraint = {
        count: users.count,
        limit: query.limit,
        offset: query.offset
      };
      delete users.count;
      var paging = _Helper2.default.paging(constraint);
      response.status(200).send({
        paging: paging,
        rows: results
      });
      response.status(200).send(results);
    });
  },

  /**
   * Search for documents by title
   * Route: GET: /search/documents?q={title}
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {void} no returns
   */
  searchDocument: function searchDocument(request, response) {
    var queryString = req.query.q;
    var query = {
      where: {
        $and: [{ $or: [{ access: 'public' }, { ownerId: request.decoded.userId }]
        }]
      },
      include: [{ model: _models2.default.User, as: 'owner' }],
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };

    if (queryString) {
      query.where.$and.push({ $or: [{ title: { $iLike: '%' + queryString + '%' } }] });
    }
    _models2.default.Document.findAndCountAll(query).then(function (allDocs) {
      var constraint = {
        count: allDocs.count,
        limit: query.limit,
        offset: query.offset
      };
      delete allDocs.count;
      var paging = _Helper2.default.paging(constraint);
      response.status(200).send({
        paging: paging,
        rows: allDocs.rows
      });
    });
  }
};

exports.default = SearchController;