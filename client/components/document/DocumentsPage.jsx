import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import { Pagination, Button } from 'react-materialize';
import DocumentsList from './DocumentsList';
import { fetchDocuments, deleteDocument } from '../../actions/DocumentAction';
import { searchDocuments } from '../../actions/Search';
import Search from '../shared/SearchBox';
/**
 * Defined as class component.
 */
class DocumentsPage extends Component {
  /**
   * Component properties
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      renderedDocuments: props.documents,
      filtered: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.removeDocument = this.removeDocument.bind(this);
    this.displayDocuments = this.displayDocuments.bind(this);
    this.filterPublicDocs = this.filterPublicDocs.bind(this);
    this.filterPrivateDocs = this.filterPrivateDocs.bind(this);
    this.filterRoleDocs = this.filterRoleDocs.bind(this);
  }
  /**
   * Checks for rendered document
   */
  componentWillMount() {
    this.props.fetchDocuments();
    this.setState({ renderedDocuments: this.props.documents });
  }
  /**
   * Handles document deletion and notification
   * @param  {Number} id Specific document Id
   */
  removeDocument(id) {
    this.props.deleteDocument(id)
      .then(() => toastr.success('Document deleted successfully!'));
  }
  /**
   * Handles search feature
   * @param  {Object} event Events from user input
   */
  handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    this.props.searchDocuments(query);
    const documentSearchResult = this.props.search;
    if (query.trim().length > 0) {
      this.setState({ renderedDocuments: documentSearchResult });
    }
  }
  /**
   * Displays list of document
   * @param  {Number} pageNumber
   */
  displayDocuments(pageNumber) {
    const offset = (pageNumber - 1)
      * this.props.metadata.pageSize;
    this.props.fetchDocuments(offset);
  }
  /**
   * Returns list of documents with public access
   */
  filterPublicDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'public');
    this.setState({ renderedDocuments, filtered: true });
  }
  /**
   * Returns list of documents with private access
   */
  filterPrivateDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'private');
    this.setState({ renderedDocuments, filtered: true });
  }
  /**
   * Returns list of documents with role access
   */
  filterRoleDocs() {
    const renderedDocuments =
    this.props.documents
      .filter(document => document.access === 'role');
    this.setState({ renderedDocuments, filtered: true });
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    const {
      totalCount,
      pageSize,
      currentPage,
      pageCount } = this.props.metadata;
    return (
      <div className="container">
        <h4 className="center">Available Documents</h4>
        <div className="row">
          <div className="col s7 push-s4">
            <Search onChange={this.handleSearch} />
          </div>
          <div className="col s5 pull-s7" id="createdocument">
            <Link
            className="btn blue darken-4"
            to="document">
              Add Document
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <Link
              className="dropdown-button blue btn s3"
              data-activates="type-list">
                Filter Documents
            </Link>
            <ul id="type-list" className="dropdown-content">
              <li className="tab col s4">
                <Button
                  className="blue"
                  onClick={this.filterPublicDocs}>
                  Public Documents
                </Button>
              </li>
              <li className="tab col s4">
                <Button
                  className="blue"
                  onClick={this.filterPrivateDocs}>
                  Private Documents
                </Button>
              </li>
              <li className="tab col s4">
                <Button
                  className="blue"
                  onClick={this.filterRoleDocs}>
                  Role Documents
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <DocumentsList
          documents={this.state.renderedDocuments}
          filtered={this.state.filtered}
          notFiltered={this.props.documents}
          deleteDocument={this.removeDocument}
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
/**
 * Maps state to properties
 * @param  {Object} state
 * @return {object}
 */
const mapStateToProps = (state) => {
  let documents = [];
  documents = state.documents;
  return {
    documents,
    search: state.search,
    auth: state.auth,
    metadata: state.paginate
  };
};

export default connect(mapStateToProps,
{ fetchDocuments, deleteDocument, searchDocuments })(DocumentsPage);
