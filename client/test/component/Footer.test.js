import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/shared/Footer';

describe('Component: Footer', () => {
  it('should render without crashing', () => {
    shallow(<Footer />);
  });

  it('should render DOM elements', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('footer')).toExist();
    expect(wrapper.find('.row')).toExist();
    expect(wrapper.find('h5')).toExist();
    expect(wrapper.find('p')).toExist();
    expect(wrapper.find('p').text())
    .toEqual('Create and store everything online.');
  });

  it('should contain content elements', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div')).toExist();
    expect(wrapper.find('ul')).toExist();
    expect(wrapper.find('li')).toExist();
  });
});
