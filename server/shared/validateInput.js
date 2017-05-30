import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
/**
 * Handles client side user input validations
 * @type {Object}
 */
const ValidateInput = {
  /**
   * Handles user login input validation
   * @param  {Object} details Data containing login details
   * @return {Object}
   */
  loginInput(details) {
    const errors = {};
    if (!validator.isEmail(details.email)) {
      errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(details.password)) {
      errors.password = 'This field is required';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
  /**
   * Handles user signup inputs validation
   * @param  {Object} details Data containing signup details
   * @return {Object}
   */
  signUpInput(details) {
    const errors = {};
    if (validator.isEmpty(details.firstName)) {
      errors.firstName = 'This field is required';
    }
    if (validator.isEmpty(details.lastName)) {
      errors.lastName = 'This field is required';
    }
    if (validator.isEmpty(details.username)) {
      errors.username = 'This field is required';
    }
    if (validator.isEmpty(details.email)) {
      errors.email = 'This field is required';
    }
    if (!validator.isEmail(details.email)) {
      errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(details.password)) {
      errors.password = 'This field is required';
    }
    if (validator.isEmpty(details.passwordConfirmation)) {
      errors.passwordConfirmation = 'This field is required';
    }
    if (!validator.equals(details.password, details.passwordConfirmation)) {
      errors.passwordConfirmation = 'Passwords must match';
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  },
};

export default ValidateInput;
