import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/DocumentAction';
import DocumentDetails from './DocumentDetails';

class DocumentDetailsPage extends Component {
  /**
   * Instantiates the class
   */
  constructor() {
    super();

    this.deleteDoc = this.deleteDoc.bind(this);
  }
  /**
   * Called when deleting a document
   * @param  {Number} id
   */
  deleteDoc(id) {
     swal({
      title: 'Are you sure you want to delete this document?',
      text: ' Press cancel to quit this operation',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#ec6c62'
    }, (isConfirm) => {
      if (isConfirm) {
        swal('Deleted!',
        'User has been deleted successfully!', 'success', 5000);
        this.props.actions.deleteDocument(id);
      } else {
        swal('Cancelled', 'Document not deleted :)', 'error');
      }
    });
  }
  /**
   * Renders to the DOM
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

const getDocumentById = (documents, id) => {
    const document = documents.filter(item => item.id === id);
    if (document) return document[0];
    return null;
  },
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
  mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(documentActions, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDetailsPage);
