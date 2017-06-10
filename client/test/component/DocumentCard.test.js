import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import DocumentCard from '../../components/document/DocumentCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const setup = () => {
  const props = {
    document: {
      title: 'title',
      content: 'content',
      access: 'public',
      owner: { firstName: 'oluwafemi', lastName: 'akinwa' } },
    deleteDocument: () => {},
    currentUser: {}
  };

  return mount(
    <DocumentCard {...props} />,
    context: { store: mockStore }
  );
};

describe('DocumentCard', () => {
  it('renders a col div', () => {
    const wrapper = setup();
    expect(wrapper.find('.col')).toExist();
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist();
  });

  it('receives the correct props', () => {
    const wrapper = setup();
    expect(wrapper.find('.card-title').text()).toEqual('title');
  });
});
