'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Validates client side document details
 * @param  {Object} values Details describing document
 * @return {Object}
 */
var CheckDocument = function CheckDocument(values) {
  var errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }
  if (!values.access) {
    errors.access = 'Select Document access';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = CheckDocument;