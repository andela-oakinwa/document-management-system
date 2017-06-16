import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { NavigationBar } from '../../components/shared/NavigationBar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user: {}
    },
    logout: () => {}
  };

  return shallow(
    <NavigationBar {...props} />,
    context: { store: mockStore }
  );
};

describe('NavigationBar', () => {
  it('should contain naviation bar DOM elements', () => {
    const wrapper = setup();
    expect(wrapper.find('header')).toExist();
    expect(wrapper.find('nav')).toExist();
    expect(wrapper.find('div')).toExist();
  });

  it('should contain props', () => {
    const wrapper = setup();
    expect(wrapper.props('logout')).toExist();
    expect(wrapper.props('auth')).toExist();
  });

  it('should contain links', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).toBe(10);
  });
});
