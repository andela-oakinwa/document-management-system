'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _DocumentCard = require('../../../../client/components/document/DocumentCard');

var _DocumentCard2 = _interopRequireDefault(_DocumentCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    document: {
      title: 'title',
      content: 'content',
      access: 'public',
      owner: { firstName: 'oluwafemi', lastName: 'akinwa' } },
    deleteDocument: function deleteDocument() {},
    currentUser: {}
  };

  return (0, _enzyme.mount)(_react2.default.createElement(_DocumentCard2.default, props));
}

describe('DocumentCard', function () {
  it('renders a row div', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.find('.row')).toExist;
  });

  it('renders card', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.find('.card')).toExist;
  });
  it('receives the correct props', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.find('.card-title').text()).toEqual('title');
  });
});