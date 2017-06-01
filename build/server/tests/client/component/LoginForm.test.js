'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _LoginForm = require('../../../../client/components/login/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setup() {
  var props = {
    errors: {},
    loginProps: {},
    onSubmit: function onSubmit() {},
    onChange: function onChange() {}
  };

  return (0, _enzyme.mount)(_react2.default.createElement(_LoginForm2.default, props));
}

describe('Component: LoginForm', function () {
  it('renders form and h5', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.find('form')).toExist;
    (0, _expect2.default)(wrapper.find('h5').text()).toEqual('Please login into your account');
    (0, _expect2.default)(wrapper.find('Row')).toExist;
    (0, _expect2.default)(wrapper.find('div')).toExist;
  });
  it('should take props', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.props().errors).toExist;
    (0, _expect2.default)(wrapper.props().loginProps).toExist;
    (0, _expect2.default)(wrapper.props().onChange).toExist;
    (0, _expect2.default)(wrapper.props().onSubmit).toExist;
  });
});