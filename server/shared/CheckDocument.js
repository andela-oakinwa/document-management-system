import isEmpty from 'lodash/isEmpty';

/**
 * Validates client side document details
 * @param  {Object} values Details describing document
 * @return {Object}
 */
const CheckDocument = (values) => {
  const errors = {};

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
    errors,
    isValid: isEmpty(errors)
  };
};

export default CheckDocument;
