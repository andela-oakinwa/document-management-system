import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import SignUpForm from '../../components/signup/SignUpForm';

const setup = () => {
  const props = {
    errors: {},
    userProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };

  return mount(<SignUpForm {...props} />);
};

describe('Component: SignUpForm', () => {
  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('Input').length).toEqual(6);
    expect(wrapper.find('h5').text()).toEqual('Create Account');
  });
  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props().errors).toExist;
    expect(wrapper.props().userProps).toExist;
    expect(wrapper.props().onChange).toExist;
    expect(wrapper.props().onSubmit).toExist;
  });
});
