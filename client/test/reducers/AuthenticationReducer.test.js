import expect from 'expect';
import users from '../../reducers/AuthenticationReducer';
import * as actions from '../../actions/Authentication';
import * as types from '../../actions/ActionType';

describe('Auth Reducer', () => {
  it('should set user when passed SET_CURRENT_USER', () => {
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = { userId: '1', roleId: '2' };

    const action = { type: types.SET_CURRENT_USER, user };
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(user);
  });
  it('should set clear when passed SET_CURRENT_USER with empty object', () => {
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = {};

    const action = { type: types.SET_CURRENT_USER, user };
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual(user);
  });
});
