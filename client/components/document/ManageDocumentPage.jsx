import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import validateInput from '../../../server/shared/CheckDocument';
import DocumentForm from './DocumentForm';
import * as documentActions from '../../actions/DocumentAction';
/**
 * Defined as class component.
 */
class ManageDocumentPage extends Component {
  /**
   * Component properties
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      document: Object.assign({}, props.document),
      errors: {},
      saving: false,
    };

    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  /**
   * Checks for props
   * @param  {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.document.id !== nextProps.document.id) {

      this.setState({ document: Object.assign({}, nextProps.document) });
    }
  }
  /**
   * Updates document data
   * @param  {Object} event
   * @return {Object}
   */
  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    if (event.target.id === 'content') {
      document.content = event.target.getContent();
    }
    document[field] = event.target.value;
    return this.setState({ document });
  }
  /**
   * Checks for a successfully document saving
   * and redirects.
   */
  saveSuccess() { this.redirect(); }
  /**
   * Displays error if saving wasn't succesfull
   * @param  {Object} error
   */
  saveFailure(error) {
    toastr.error(error);
    this.setState({ saving: false });
  }
  /**
   * Checks document details
   * @return {Boolean} True or false
   */
  isValid() {
    const data = {
      title: this.state.document.title,
      content: this.state.document.content,
      access: this.state.document.access
    };
    const { errors, isValid } = validateInput(data);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * Handles saving document
   * @param  {Object} event
   */
  saveDocument(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ saving: true, errors: {} });
      if (this.state.document.id) {
        this.props.actions.updateDocument(this.state.document)
            .then(this.saveSuccess.bind(this), this.saveFailure.bind(this));
      } else {
        this.props.actions.saveDocument(this.state.document)
          .then(this.saveSuccess.bind(this), this.saveFailure.bind(this));
      }
    }
  }
  /**
   * Redirects after saving
   */
  redirect() {
    this.setState({ saving: false });
    toastr.success('Document saved');
    this.context.router.push('/');
  }
  /**
   * Renders to the DOM
   * @return {Object}
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <DocumentForm
          onChange={this.updateDocumentState}
          onSave={this.saveDocument}
          document={this.state.document}
          errors={this.state.errors}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageDocumentPage.propTypes = {
  document: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
};

ManageDocumentPage.contextTypes = {
  router: React.PropTypes.object,
};
/**
 * Fetches document by Id
 * @param  {Object} documents
 * @param  {Number} id
 * @return {Object}
 */
const getDocumentById = (documents, id) => {
  const document = documents.filter(item => item.id === id);
  if (document) return document[0];
  return null;
},
  /**
   * Maps state to properties
   * @param  {Object} state
   * @return {Object}
   */
  mapStateToProps = (state, ownProps) => {
    const documentId = ownProps.params.id;
    let document;
    if (documentId && state.documents.length > 0) {
      document = getDocumentById(state.documents, parseInt(documentId, 10));
    }
    return {
      document,
    };
  },
  /**
   * Dispatches actions
   * @param  {Object} dispatch
   * @return {Object}
   */
  mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(documentActions, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ManageDocumentPage);
