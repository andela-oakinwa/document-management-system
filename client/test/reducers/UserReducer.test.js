import expect from 'expect';
import users from '../../reducers/UserReducer';
import * as actions from '../../actions/UserAction';
import * as types from '../../actions/ActionType';

describe('Admin Reducer', () => {
  it('should update user when passed UPDATE_USER', () => {
    const initialState = [
      { id: '1', username: 'userA' },
      { id: '2', username: 'userB' },
      { id: '3', username: 'userC' }
    ];

    const user = { id: '2', username: 'oluwafemi' };
    const action = { type: types.UPDATE_USER, user };

    const newState = users(initialState, action);
    const updatedUser = newState.find(a => a.id === user.id);
    const untouchedUser = newState.find(a => a.id === '1');

    expect(updatedUser.username).toEqual('oluwafemi');
    expect(untouchedUser.username).toEqual('userA');
    expect(newState.length).toEqual(initialState.length);
  });

  it('should add user to state when passed LOAD_USER', () => {
    const initialState = [
      { id: '1', username: 'userA' },
      { id: '2', username: 'userB' },
      { id: '3', username: 'userC' }
    ];

    const user = { id: '4', username: 'oluwafemi' };
    const action = { type: types.LOAD_USER, user };

    const newState = users(initialState, action);

    expect(newState.length).toEqual(initialState.length + 1);
  });
  it('should delete user when passed DELETE_USER', () => {
    const initialState = [
      { id: '1', username: 'userA' },
      { id: '2', username: 'userB' },
      { id: '3', username: 'userC' }
    ];

    const action = { type: types.DELETE_USER, userId: '2' };

    const newState = users(initialState, action);

    expect(newState.length).toEqual(initialState.length - 1);
  });
  it('should set users when passed SET_USERS', () => {
    const initialState = [];
    const usersToSet = [
      { id: '1', username: 'A' },
      { id: '2', username: 'B' },
      { id: '3', username: 'C' }
    ];

    const action = { type: types.SET_USERS, users: usersToSet };
    const newState = users(initialState, action);

    expect(newState.length).toEqual(usersToSet.length);
  });
});
