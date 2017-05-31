import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/DocumentAction';
import DocumentDetails from './DocumentDetails';
/**
 * Component declared as a class
 */
class DocumentDetailsPage extends React.Component {
  /**
   * Instance props
   */
  constructor() {
    super();

    this.deleteDoc = this.deleteDoc.bind(this);
  }
  /**
   * Deletes document
   * @param  {Number} id Document Id
   * @return {Object}
   */
  deleteDoc(id) {
    this.props.actions.deleteDocument(id)
      .then(response => toastr.success('Document deleted successfully!'));
  }
  /**
   * DOM rendering
   * @return {Object}
   */
  render() {
    return (
      <div>
        <DocumentDetails
         document={this.props.document}
         deleteDocument={this.deleteDoc}
         currentUser={this.props.auth.user}
        />
      </div>
    );
  }
}

DocumentDetailsPage.propTypes = {
  document: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
};
/**
 * Gets document by Id
 * @param  {Object} documents Document details
 * @param  {Number} id Document Id
 * @return {Object}
 */
const getDocumentById = (documents, id) => {
  const document = documents.filter(item => item.id === id);
  if (document) return document[0];
  return null;
},
  /**
   * Redux map state to component properties
   * @param  {Object} state    Data that describes app
   * @param  {Object} ownProps Component properties
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
      auth: state.auth,
    };
  },
  /**
   * Dispatches action to props
   * @param  {Object} dispatch Action
   * @return {Object}
   */
  mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(documentActions, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsPage);
