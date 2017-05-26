import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentCard from '../../../../client/components/document/DocumentCard';

function setup() {
  const props = {
    document: {
      title: 'title',
      content: 'content',
      access: 'public',
      owner: { firstName: 'awa', lastName: 'awa' } },
    deleteDocument: () => {},
    currentUser: {}
  };

  return mount(<DocumentCard {...props} />);
}

describe('DocumentCard', () => {
  it('renders a row div', () => {
    const wrapper = setup();
    expect(wrapper.find('.row')).toExist;
  });

  it('renders card', () => {
    const wrapper = setup();
    expect(wrapper.find('.card')).toExist;
  });
  it('receives the correct props', () => {
    const wrapper = setup();
    expect(wrapper.find('.card-title').text()).toEqual('title');
  });
});
