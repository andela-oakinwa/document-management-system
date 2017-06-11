import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../components/login/LoginForm';

const setup = () => {
  const props = {
    errors: {},
    loginProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return shallow(<LoginForm {...props} />
  );
};

describe('Component: LoginForm', () => {
  it('renders form and h5', () => {
    const wrapper = setup();
    expect(wrapper.find('form')).toExist();
    expect(wrapper.find('h5').text())
    .toEqual('Please login into your account.');
    expect(wrapper.find('Row')).toExist();
    expect(wrapper.find('div')).toExist();
  });
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props('errors')).toExist();
    expect(wrapper.props('loginProps')).toExist();
    expect(wrapper.props('onChange')).toExist();
    expect(wrapper.props('onSubmit')).toExist();
  });
});
