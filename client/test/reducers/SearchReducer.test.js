import expect from 'expect';
import search from '../../reducers/SearchReducer';
import * as actions from '../../actions/Search';

describe('Search Reducer', () => {
  it('should return document when passed SEARCH_RESULTS', () => {
    const initialState = [];
    const documentSearched = [
      { id: '1', title: 'Andal' },
      { id: '2', title: 'TIA' },
      { id: '3', title: 'EPIC' }
    ];

    const action = actions.documentSearched(documentSearched);
    const newState = search(initialState, action);

    expect(newState.length).toEqual(documentSearched.length);
  });

  it('should return state when no action is passed by default', () => {
    const initialState = [];
    const action = {};
    const newState = search(initialState, action);

    expect(newState.length).toEqual(search.length);
  });
});
