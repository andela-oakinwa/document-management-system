import expect from 'expect';
import users from '../../../../client/reducers/AuthenticationReducer';
import * as actions from '../../../../client/actions/Authentication';
import * as types from '../../../../client/actions/ActionType';

describe('Auth Reducer', () => {
  it('should set user when passed SET_CURRENT_USER', () => {
    // arrange
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = { userId: '1', roleId: '2' };

    const action = { type: types.SET_CURRENT_USER, user };
    // act
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user).toEqual(user);
  });
  it('should set clear when passed SET_CURRENT_USER with empty object', () => {
    // arrange
    const initialState = {
      isAuthenticated: false,
      user: {},
    };

    const user = {};

    const action = { type: types.SET_CURRENT_USER, user };
    // act
    const newState = users(initialState, action);

    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user).toEqual(user);
  });
});
