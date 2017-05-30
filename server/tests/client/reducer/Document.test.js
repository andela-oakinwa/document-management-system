import expect from 'expect';
import documents from '../../../../client/reducers/DocumentReducer';
import * as actions from '../../../../client/actions/DocumentAction';
import * as types from '../../../../client/actions/ActionType';

describe('Document Reducer', () => {
  it('should add document when passed CREATE_DOCUMENT', () => {
    // arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];

    const newDocument = { title: 'C' };

    const action = { type: types.CREATE_DOCUMENT, document: newDocument };

    // act
    const newState = documents(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update document when passed UPDATE_DOCUMENT', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const document = { id: '2', title: 'New Title' };
    const action = { type: types.UPDATE_DOCUMENT, document };

    // act
    const newState = documents(initialState, action);
    const updatedDocument = newState.find(a => a.id === document.id);
    const untouchedDocument = newState.find(a => a.id === '1');

    // assert
    expect(updatedDocument.title).toEqual('New Title');
    expect(untouchedDocument.title).toEqual('A');
    expect(newState.length).toEqual(initialState.length);
  });

  it('should return document when passed LOAD_DOCUMENT', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const document = { id: '4', title: 'Document Fetched' };
    const action = { type: types.LOAD_DOCUMENT, document };

    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(initialState.length + 1);
  });
  it('should delete document when passed DELETE_DOCUMENT', () => {
    // arrange
    const initialState = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const action = { type: types.DELETE_DOCUMENT, documentId: '2' };
    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(initialState.length - 1);
  });
  it('should set documents when passed SET_DOCUMENTS', () => {
    // arrange
    const initialState = [];
    const documentsToSet = [
      { id: '1', title: 'A' },
      { id: '2', title: 'B' },
      { id: '3', title: 'C' }
    ];

    const action = { type: types.SET_DOCUMENTS, documents: documentsToSet };
    // act
    const newState = documents(initialState, action);

    expect(newState.length).toEqual(documentsToSet.length);
  });
});
