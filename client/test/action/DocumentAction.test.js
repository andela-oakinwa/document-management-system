import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import nock from 'nock';
import * as actions from '../../actions/DocumentAction';
import * as types from '../../actions/ActionType';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Document Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it(`creates SET_DOCUMENTS and SET_PAGINATION
    when fetching documents has been done`, () => {
    nock('http://localhost:4000')
      .get('/documents')
      .reply(200, {
        body: { pagination:
        {
          totalCount: 1,
          pageSize: 2,
          currentPage: 1,
          pageCount: 6 },
          rows: [{ title: '', content: '', access: '', owner: {} }] } });

    const expectedActions = [{ type: types.SET_DOCUMENTS,
      documents: [{ title: '', content: '', access: '', owner: {} }] },

    { type: types.SET_PAGINATION,
      pagination: {
        totalCount: 1,
        pageSize: 2,
        currentPage: 1,
        pageCount: 6 } }];
    const store = mockStore({ documents: [], paginate: {} });

    store.dispatch(actions.fetchDocuments())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates ADD_DOCUMENT when saving document has been done', () => {
    const document = {
      title: 'Story',
      content: 'This is my story',
      access: 'public'
    };
    nock('http://localhost:4000')
      .post('/documents', document)
      .reply(200, {
        body: {
          document: {
            title: 'Story',
            content: 'This is my story',
            access: 'public'
          }
        }
      });
    const expectedActions = [{ type: types.ADD_DOCUMENT,
      document: {
        title: 'title',
        content: 'This is my story',
        access: 'public'
      }
    }];
    const store = mockStore({ documents: [] });
    store.dispatch(actions.saveDocument())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
