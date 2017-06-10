import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as auth from '../../actions/Authentication';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Action', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('creates SET_CURRENT_USER when login has been done', () => {
    const user = { email: 'femi.akinwa@gmail.com', password: 'oluwafemi' };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token: 'ghTHosfj472598sjdhgU',
          user: { userId: 1, roleId: 1 }
        },
      });
    });
    /*'http://localhost:4000')
      .post('/users/login', user)
      .reply(200, {
        body: {
          token: 'ghTHosfj472598sjdhgU',
          user: { userId: 1, roleId: 1 }
        }
      });*/
    const expectedActions = [{
      type: types.SET_CURRENT_USER,
      user,
    }];
    const store = mockStore({ auth: {} });
    return store.dispatch(auth.login(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
