import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DocumentForm from '../../components/document/DocumentForm';

const setup = (saving) => {
  const props = {
    document: { title: 'title', content: 'content', access: 'public' },
    saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<DocumentForm {...props} />);
};

describe('Component: DocumentForm', () => {
  it('renders form and h5', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5').text()).toEqual('Create/Update a Document');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Input').at(1).props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('Input').at(1).props().value).toBe('Saving...');
  });

  it('should receive the right user details when updating user', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Input').at(0).props().value).toBe('title');
    expect(wrapper.find('select').props().value).toBe('public');
  });
});
