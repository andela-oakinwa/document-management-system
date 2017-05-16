import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import { Pagination, Button } from 'react-materialize';
import DocumentsList from './DocumentList';
import { fetchDocuments, deleteDocument } from '../../actions/documentActions';
import { searchDocuments } from '../../actions/searchActions';
import Search from '../common/Search';

class DocumentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderedDocuments: props.documents,
      filtered: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.deleteDoc = this.deleteDoc.bind(this);
    this.displayDocuments = this.displayDocuments.bind(this);
    this.filterPublicDocs = this.filterPublicDocs.bind(this);
    this.filterPrivateDocs = this.filterPrivateDocs.bind(this);
    this.filterRoleDocs = this.filterRoleDocs.bind(this);
  }

  componentWillMount() {
    this.props.fetchDocuments();
    this.setState({ renderedDocuments: this.props.documents });
  }

  deleteDoc(id) {
    this.props.deleteDocument(id)
      .then(res => toastr.success('Document deleted successfully!'));
  }

  handleSearch(e) {
    e.preventDefault();
    const query = e.target.value;
    this.props.searchDocuments(query);
    const documentSearchResult = this.props.search;
    if (query.trim().length > 0) {
      this.setState({ renderedDocuments: documentSearchResult });
    }
  }

  displayDocuments(pageNumber) {
    const offset = (pageNumber - 1)
      * this.props.metadata.pageSize;
    this.props.fetchDocuments(offset);
  }

  filterPublicDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'public');
    this.setState({ renderedDocuments, filtered: true });
  }
  filterPrivateDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'private');
    this.setState({ renderedDocuments, filtered: true });
  }
  filterRoleDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'role');
    this.setState({ renderedDocuments, filtered: true });
  }

  render() {
    const {
      totalCount,
      pageSize,
      currentPage,
      pageCount } = this.props.metadata;
    return (
      <div>
        <h1>Available Documents</h1>
        <div className="row">
          <div className="col s7 push-s4">
            <Search onChange={this.handleSearch} />
          </div>
          <div className="col s5 pull-s7" id="createdocument">
            <Link
            className="btn create-list-link hero-btn"
            to="document">
              Add Document
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ul>
              <li className="tab col s4">
                <Button
                  onClick={this.filterPublicDocs}
                >Public Documents</Button></li>
              <li className="tab col s4">
                <Button
                onClick={this.filterPrivateDocs}>
                Private Documents</Button>
              </li>
              <li className="tab col s4">
                <Button
                onClick={this.filterRoleDocs}
                >Role Documents</Button></li>
            </ul>
          </div>
        </div>

        <DocumentsList
          documents={this.state.renderedDocuments}
          filtered={this.state.filtered}
          notFiltered={this.props.documents}
          deleteDocument={this.deleteDoc}
          currentUser={this.props.auth.user}
        />
        <Pagination
          items={pageCount}
          activePage={currentPage}
          maxButtons={Math.ceil(totalCount / pageSize)}
          onSelect={this.displayDocuments}
        />
      </div>
    );
  }
}

DocumentsPage.propTypes = {
  search: React.PropTypes.array.isRequired,
  fetchDocuments: React.PropTypes.func.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  searchDocuments: React.PropTypes.func.isRequired,
  auth: React.PropTypes.object.isRequired,
  documents: React.PropTypes.array.isRequired,
  metadata: React.PropTypes.object
};

function mapStateToProps(state) {
  let documents = [];
  documents = state.documents;
  return {
    documents,
    search: state.search,
    auth: state.auth,
    metadata: state.paginate
  };
}

export default connect(mapStateToProps,
{ fetchDocuments, deleteDocument, searchDocuments })(DocumentsPage);
