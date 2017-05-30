import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginForm from '../../../../client/components/login/LoginForm';

function setup() {
  const props = {
    errors: {},
    loginProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<LoginForm {...props} />);
}

describe('Component: LoginForm', () => {
  it('renders form and h5', () => {
    const wrapper = setup();
    expect(wrapper.find('form')).toExist;
    expect(wrapper.find('h5').text()).toEqual('Please login into your account');
    expect(wrapper.find('Row')).toExist;
    expect(wrapper.find('div')).toExist;
  });
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().loginProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
