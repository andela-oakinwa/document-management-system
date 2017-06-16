import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProfileForm from '../../components/profile/ProfileForm';


const setup = () => {
  const props = {
    userProps: {},
    onSubmit: () => {},
    onChange: () => {}
  };
  return shallow(<ProfileForm {...props}/>);
};

describe('Component: ProfileForm', () => {
  it('should render profile form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5')).toExist();
    expect(wrapper.find('h5').text()).toEqual('Edit Profile');
  });

  it('should contain props', () => {
    const wrapper = setup();
    expect(wrapper.props('userProps')).toExist();
    expect(wrapper.props('onChange')).toExist();
    expect(wrapper.props('onSubmit')).toExist();
  });

  it('should contain button', () => {
    const wrapper = setup();
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(4);
  });
});
