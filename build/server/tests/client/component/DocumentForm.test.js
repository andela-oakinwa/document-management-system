'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _DocumentForm = require('../../../../client/components/document/DocumentForm');

var _DocumentForm2 = _interopRequireDefault(_DocumentForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setup = function setup(saving) {
  var props = {
    document: { title: 'title', content: 'content', access: 'public' },
    saving: saving,
    errors: {},
    onSave: function onSave() {},
    onChange: function onChange() {}
  };

  return (0, _enzyme.shallow)(_react2.default.createElement(_DocumentForm2.default, props));
};

describe('Component: DocumentForm', function () {
  it('renders form and h5', function () {
    var wrapper = setup(false);
    (0, _expect2.default)(wrapper.find('form').length).toBe(1);
    (0, _expect2.default)(wrapper.find('h5').text()).toEqual('Create/Update a Document');
  });

  it('save button is labeled "Save" when not saving', function () {
    var wrapper = setup(false);
    (0, _expect2.default)(wrapper.find('Input').at(1).props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', function () {
    var wrapper = setup(true);
    (0, _expect2.default)(wrapper.find('Input').at(1).props().value).toBe('Saving...');
  });

  it('should receive the right user details when updating user', function () {
    var wrapper = setup(false);
    (0, _expect2.default)(wrapper.find('Input').at(0).props().value).toBe('title');
    (0, _expect2.default)(wrapper.find('select').props().value).toBe('public');
  });
});