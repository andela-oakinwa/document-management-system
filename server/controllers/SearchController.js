/**
 * Dependencies declared
 */
import db from '../models';
import Helper from '../helpers/Helper';

const SearchController = {
  /**
   * Search for a user
   * Route: GET: /search/users?q={queryParam}
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {void} no returns
   */
  searchUser(request, response) {
    const query = {
      where: {
        $or: [{
          userName: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          firstName: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          lastName: {
            $iLike: `%${request.query.q}%`
          }
        }, {
          email: {
            $iLike: `%${request.query.q}%`
          }
        }],
      },
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };
    db.User.findAndCountAll(query)
      .then((users) => {
        const results = users.rows.map(user => Helper.userProfile(user));
        const constraint = {
          count: users.count,
          limit: query.limit,
          offset: query.offset
        };
        delete users.count;
        const paging = Helper.paging(constraint);
        response.status(200)
          .send({
            paging,
            rows: results
          });
        response.status(200)
          .send(results);
      });
  },
  /**
   * Search for documents by title
   * Route: GET: /search/documents?q={title}
   * @param {Object} request Request object
   * @param {Object} response Response object
   * @returns {void} no returns
   */
  searchDocument(request, response) {
    const queryString = req.query.q;
    const query = {
      where: {
        $and: [{ $or: [
          { access: 'public' },
          { ownerId: request.decoded.userId },
        ],
        }],
      },
      include: [{ model: db.User, as: 'owner' }],
      limit: request.query.limit || 10,
      offset: request.query.offset || 0,
      order: [['createdAt', 'DESC']]
    };

    if (queryString) {
      query.where.$and.push({ $or: [
        { title: { $iLike: `%${queryString}%` } },
      ] });
    }
    db.Document.findAndCountAll(query)
      .then((allDocs) => {
        const constraint = {
          count: allDocs.count,
          limit: query.limit,
          offset: query.offset
        };
        delete allDocs.count;
        const paging = Helper.paging(constraint);
        response.status(200)
          .send({
            paging,
            rows: allDocs.rows
          });
      });
  }
};

export default SearchController;
