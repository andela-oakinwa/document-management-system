'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _App = require('../../../../client/components/App');

var _App2 = _interopRequireDefault(_App);

var _NavigationBar = require('../../../../client/components/shared/NavigationBar');

var _NavigationBar2 = _interopRequireDefault(_NavigationBar);

var _FooterPage = require('../../../../client/components/shared/FooterPage');

var _FooterPage2 = _interopRequireDefault(_FooterPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Component: App', function () {
  it('should render without crashing', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(_App2.default, null));
  });

  it('should render Component: NavigationBar', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_App2.default, null));
    var navbar = _react2.default.createElement(_NavigationBar2.default, null);
    (0, _expect2.default)(wrapper.contains(navbar)).toEqual(true);
  });

  it('should render Component: FooterPage', function () {
    var mainApp = (0, _enzyme.shallow)(_react2.default.createElement(_App2.default, null));
    var footer = _react2.default.createElement(_FooterPage2.default, null);
    (0, _expect2.default)(mainApp.contains(footer)).toEqual(true);
  });

  it('renders children when passed in', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _App2.default,
      null,
      _react2.default.createElement(_NavigationBar2.default, null),
      _react2.default.createElement(_FooterPage2.default, null)
    ));
    (0, _expect2.default)(wrapper.contains(_react2.default.createElement(_NavigationBar2.default, null))).toEqual(true);
    (0, _expect2.default)(wrapper.contains(_react2.default.createElement(_FooterPage2.default, null))).toEqual(true);
  });
});