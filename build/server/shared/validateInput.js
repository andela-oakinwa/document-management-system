'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles client side user input validations
 * @type {Object}
 */
var ValidateInput = {
  /**
   * Handles user login input validation
   * @param  {Object} details Data containing login details
   * @return {Object}
   */
  loginInput: function loginInput(details) {
    var errors = {};
    if (!_validator2.default.isEmail(details.email)) {
      errors.email = 'Email is invalid';
    }
    if (_validator2.default.isEmpty(details.password)) {
      errors.password = 'This field is required';
    }
    return {
      errors: errors,
      isValid: (0, _isEmpty2.default)(errors)
    };
  },

  /**
   * Handles user signup inputs validation
   * @param  {Object} details Data containing signup details
   * @return {Object}
   */
  signUpInput: function signUpInput(details) {
    var errors = {};
    if (_validator2.default.isEmpty(details.firstName)) {
      errors.firstName = 'This field is required';
    }
    if (_validator2.default.isEmpty(details.lastName)) {
      errors.lastName = 'This field is required';
    }
    if (_validator2.default.isEmpty(details.username)) {
      errors.username = 'This field is required';
    }
    if (_validator2.default.isEmpty(details.email)) {
      errors.email = 'This field is required';
    }
    if (!_validator2.default.isEmail(details.email)) {
      errors.email = 'Email is invalid';
    }
    if (_validator2.default.isEmpty(details.password)) {
      errors.password = 'This field is required';
    }
    if (_validator2.default.isEmpty(details.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!_validator2.default.equals(details.password, details.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    return {
      errors: errors,
      isValid: (0, _isEmpty2.default)(errors)
    };
  }
};

exports.default = ValidateInput;