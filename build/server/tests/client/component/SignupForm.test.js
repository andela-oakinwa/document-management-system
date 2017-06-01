'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _SignUpForm = require('../../../../client/components/signup/SignUpForm');

var _SignUpForm2 = _interopRequireDefault(_SignUpForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setup = function setup() {
  var props = {
    errors: {},
    userProps: {},
    onSubmit: function onSubmit() {},
    onChange: function onChange() {}
  };

  return (0, _enzyme.mount)(_react2.default.createElement(_SignUpForm2.default, props));
};

describe('Component: SignUpForm', function () {
  it('should render self', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.length).toEqual(1);
    (0, _expect2.default)(wrapper.find('Input').length).toEqual(6);
    (0, _expect2.default)(wrapper.find('h5').text()).toEqual('Create Account');
  });
  it('should take props', function () {
    var wrapper = setup();
    (0, _expect2.default)(wrapper.props().errors).toExist;
    (0, _expect2.default)(wrapper.props().userProps).toExist;
    (0, _expect2.default)(wrapper.props().onChange).toExist;
    (0, _expect2.default)(wrapper.props().onSubmit).toExist;
  });
});