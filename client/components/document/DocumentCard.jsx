import React from 'react';
import { Link } from 'react-router';

const DocumentCard = ({ document, deleteDocument, currentUser }) => {
  // console.log(document);
  return (
    <div className="col s4">
      <div className="card main-box">
        <div className="card-content white-text doc-box">
          <span className="card-title">{document.title}</span>
          <p>Access: &nbsp; <span>{(document.access)}</span></p><br />
          <div>
              Published Date :
            <p>{(document.createdAt) ? document.createdAt.split('T')[0] : ''}</p>
            <p> Author:
                {document.User.firstName} {document.User.lastName}</p>
          </div>
        </div>
        <div className="card-action">
          <Link to={`/document/${document.id}/details`}>
              Details
          </Link>
          {currentUser.userId === document.ownerId &&
            <div className="right">
              <Link className="edit" to={`/document/${document.id}`}>Edit</Link>
              <Link className="delete" to="/" onClick={deleteDocument(document.id)}>
                Delete
              </Link>
            </div>}</div>
      </div>
    </div>
  );
};

DocumentCard.propTypes = {
  document: React.PropTypes.object.isRequired,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  handleClick: React.PropTypes.func.isRequired
};
export default DocumentCard;
