import expect from 'expect';
import CheckDocument from '../../utilities/CheckDocument';

describe('CheckDocument', () => {
  const createdDocument = {
    title: '',
    content: '',
    access: ''
  };
  it('should return error for blank document fields', () => {
    expect(CheckDocument(createdDocument).errors.title).toBe('Enter a Title');
    expect(CheckDocument(createdDocument).errors
      .content).toBe('Enter some content');
  });
});
