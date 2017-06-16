import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/UserAction';
import * as auth from '../../actions/Authentication';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates DELETE_USER when succesfully deleted a user', () => {
    nock('http://localhost:4000')
      .delete(`/users/${2}`)
      .reply(200, {
        body: {
          data: 'User has been successfully deleted.'
        }
      });
    const expectedActions = [{
      type: types.DELETE_USER,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }];
    const store = mockStore({ users: {} });
    store.dispatch(actions.deleteUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates LOAD_USER when a user is fetched', () => {
    nock('http://localhost:4000')
      .get(`/users/${2}`)
      .reply(200, {
        body: {
          data: 'You have successfully retrieved this user..'
        }
      });
    const expectedActions = [{
      type: types.DELETE_USER,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }];
    const store = mockStore({ users: {} });
    store.dispatch(actions.fetchUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates UPDATE_USER when succesfully updated a user', () => {
    nock('http://localhost:4000')
      .put(`/users/${2}`)
      .reply(200, {
        body: {
          data: 'User has been successfully deleted.'
        }
      });
    const expectedActions = [{
      type: types.UPDATE_USER,
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }];
    const store = mockStore({ user: {} });
    store.dispatch(actions.updateUser())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates SET_USERS and SET_PAGINATION when fetching users has been done',
    () => {
      nock('http://localhost:4000')
        .get(`/users/?offset=${0}&limit=${5}`)
        .reply(200, {
          body: {
            pagination: {
              totalCount: 1,
              pageSize: 2,
              currentPage: 1,
              pageCount: 6 },
            rows: [{
              username: 'oluwafemi',
              firstName: 'Oluwafemi',
              lastName: 'Akinwa',
              email: 'femi.akinwa@gmail.com',
              password: 'oluwafemi' }]
          } });

      const expectedActions = [{ type: types.SET_USERS,
        users: [{
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        }] },

      { type: types.SET_PAGINATION,
        pagination: {
          totalCount: 1,
          pageSize: 2,
          currentPage: 1,
          pageCount: 6 }
      }];
      const store = mockStore({ users: [], paginate: {} });
      store.dispatch(actions.fetchUsers())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it('creates SET_CURRENT_USER when login has been done',
    () => {
      const user = { username: 'oluwafemi', password: 'oluwafemi' };
      nock('http://localhost:4000')
        .post('/users/login', user)
        .reply(200, {
          body: { token: 'sjlgavhalbvlis', user: { userId: 2, roleId: 2 } } });

      const expectedActions = [{ type: types.SET_CURRENT_USER,
        user }];
      const store = mockStore({ auth: {} });
      store.dispatch(auth.login(user))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
