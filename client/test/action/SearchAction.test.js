import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import { searchDocuments, searchUsers } from '../../actions/Search';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Search Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SEARCH_RESULTS when search is done.',
    () => {
      const queryString = 'queryString';
      nock('http://localhost:4000')
        .post(`/documents/search/documents?q=${queryString}`)
        .reply(200, {
          body: {
            pagination: {},
            rows: [{
              title: 'queryString',
              content: 'Content here' }]
          }
        });

      const expectedActions = [{
        type: types.SET_PAGINATION,
        pagination: {
          totalCount: 1,
          pageSize: 2,
          currentPage: 1,
          pageCount: 6 } },
      {
        type: types.SEARCH_RESULTS,
        documents: [{
          title: 'queryString',
          content: 'Content here'
        }]
      }];

      const store = mockStore({ users: [] });
      store.dispatch(searchDocuments(queryString))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
  });

  it('creates SEARCH_RESULTS when search is done.',
  () => {
    const queryString = 'queryString';
    nock('http://localhost:4000')
      .post(`/users/search/users?q=${queryString}`)
      .reply(200, {
        body: {
          pagination: {},
          rows: [{
            title: 'queryString',
            content: 'Content here' }]
        }
      });

    const expectedActions = [{
      type: types.SET_PAGINATION,
      pagination: {
        totalCount: 1,
        pageSize: 2,
        currentPage: 1,
        pageCount: 6 } },
    {
      type: types.SEARCH_RESULTS,
      documents: [{
        title: 'queryString',
        content: 'Content here'
      }]
    }];

    const store = mockStore({ users: [] });
    store.dispatch(searchUsers(queryString))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
});
});
