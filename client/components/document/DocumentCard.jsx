import React from 'react';
import { Link } from 'react-router';
import { deleteDocument } from '../../actions/DocumentAction';

const DocumentCard = ({ document, currentUser }) => {
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
            <p>{(document.createdAt) ? document.createdAt.split('T')[0] : ''}</p>
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
              <Link className="edit" to={`/document/${document.id}/edit`}>Edit</Link>
              <Link className="delete" to="/" onClick={() => deleteDocument(document.id)}>
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
  currentUser: React.PropTypes.object.isRequired
};

export default DocumentCard;
