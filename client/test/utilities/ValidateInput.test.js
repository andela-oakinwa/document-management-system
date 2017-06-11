import expect from 'expect';
import ValidateInput from '../../utilities/ValidateInput';

describe('Validate Login inputs', () => {
  const login = {
    email: '',
    password: ''
  };
  it('should return error message for blank inputs', () => {
    expect(ValidateInput.checkLogin(login).errors.email)
    .toBe('This field is required');
    expect(ValidateInput.checkLogin(login).errors.password)
    .toBe('This field is required');
  });
});

describe('Validate Signup inputs', () => {
  const signUp = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  it('should return error message for blank signup form', () => {
    expect(ValidateInput.checkSignup(signUp).errors.firstName)
    .toBe('This field is required');
    expect(ValidateInput.checkSignup(signUp).errors.lastName)
    .toBe('This field is required');
    expect(ValidateInput.checkSignup(signUp).errors.username)
    .toBe('This field is required');
    expect(ValidateInput.checkSignup(signUp).errors.email)
    .toBe('This field is required');
    expect(ValidateInput.checkSignup(signUp).errors.password)
    .toBe('This field is required');
  });

  it('should return error message for password not matching', () => {
    const notMatching = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: 'oluwafemi',
      passwordConfirmation: 'akinwa'
    };
    expect(ValidateInput.checkSignup(notMatching).errors.passwordConfirmation)
    .toBe('Passwords must match');
  });
});
