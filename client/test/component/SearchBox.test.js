import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from '../../components/shared/SearchBox';

const setup = () => {
  const props = {
    onChange: () => {}
  };
  return shallow(<SearchBox {...props}/>);
};
describe('Component: SearchBox', () => {
  it('should render without crashing', () => {
    shallow(<SearchBox />);
  });

  it('should render search box and icon', () => {
    const wrapper = setup();
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('.search')).toExist();
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('Icon').length).toBe(1);
  });

  it('should take props', () => {
    const wrapper = setup();
    expect(wrapper.props('onChange')).toExist();
  });
});
