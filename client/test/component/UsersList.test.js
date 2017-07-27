import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import UsersList from '../../components/users/UsersList';

const setup = () => {
  const props = {
    auth: {},
    users: [],
    deleteUsers: () => {}
  };
  return shallow(<UsersList {...props}/>);
};

describe('Component: UsersList', () => {
  it('should render list without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('table')).toExist();
    expect(wrapper.find('thead')).toExist();
    expect(wrapper.find('tbody')).toExist();
    expect(wrapper.find('tr')).toExist();
    expect(wrapper.find('th')).toExist();
  });

  it('should contain props', () => {
    const wrapper = setup();
    expect(wrapper.props('auth')).toExist();
    expect(wrapper.props('users')).toExist();
    expect(wrapper.props('deleteUsers')).toExist();
  });
});
