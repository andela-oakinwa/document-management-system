import React, { Component } from 'react';
import { Link } from 'react-router';
import { deleteDocument } from '../../actions/DocumentAction';

class DocumentCard extends Component {
  /**
   * Instantiates class
   * @param  {Object} props Component props
   */
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }
  /**
   * Called for document delete
   * @param  {Number} documentId Id of the document to delete
   */
  deleteDocument(documentId) {
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
        'User has been deleted successfully!', 'success');
        this.props.deleteDocument(documentId);
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
    const { document, currentUser} = this.props;
    const { firstName, lastName } = document.User ||
      { firstName: '', lastName: '' };
    return (
      <div className="col s4">
        <div className="card main-box">
          <div className="card-content white-text doc-box">
            <span className="card-title">{document.title}</span>
            <p>Access: &nbsp; <span>{(document.access)}</span></p><br />
            <div>
                Published Date :
              <p>{(document.createdAt) ? 
                document.createdAt.split('T')[0] : ''}</p>
              <p> Author:
                  {firstName } { lastName }</p>
            </div>
          </div>
          <div className="card-action">
            <Link to={`/document/${document.id}/details`}>
                Details
            </Link>
            {currentUser.userId === document.ownerId &&
              <div className="right">
                <Link className="edit" to={`/document/${document.id}/edit`}>
                  Edit
                </Link>
                <Link 
                className="delete"
                to="/"
                onClick={() => this.deleteDocument(document.id)}>
                  Delete
                </Link>
              </div>}
          </div>
        </div>
      </div>
    );
  }
}

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired
};

export default DocumentCard;
