import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import About from '../../components/About';

describe('Component: About', () => {
  it('should render without crashing', () => {
    shallow(<About />);
  });

  it('should render heading with `About`', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('h3')).toExist();
  });

  it('should contain div element', () => {
    const wrapper = shallow(<About />);
    const innerText = 'Doqman lets you create, store and update documents on the fly online.';
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('p')).toExist();
    expect(wrapper.find('p').text()).toEqual(innerText);
  });
});
