import React from 'react';
import { Pagination } from 'react-materialize';
import DocumentCard from './DocumentCard';
/**
 * Lists documents in each category
 * @param  {Function} options.documents
 * @param  {Function} options.deleteDocument
 * @param  {Function} options.currentUser
 * @param  {Function} options.filtered
 * @param  {Function} options.notFiltered
 * @return {Object}
 */
const DocumentsList = ({ documents,
  deleteDocument, currentUser, filtered, notFiltered }) => {
  const emptyMessage = (<p>No documents Found</p>),
    isFiltered = filtered ? documents : notFiltered,
    documentsList = (
      <div>
        {isFiltered.map(document => <DocumentCard
        document={document} key={document.id}
        deleteDocument={deleteDocument}
        currentUser={currentUser} />)}
      </div>
    );

  return (
    <div className="row">
      {isFiltered.length > 0 ? documentsList : emptyMessage}
    </div>
  );
};

DocumentsList.propTypes = {
  documents: React.PropTypes.array,
  deleteDocument: React.PropTypes.func.isRequired,
  currentUser: React.PropTypes.object.isRequired,
  filtered: React.PropTypes.bool,
  notFiltered: React.PropTypes.array
};

export default DocumentsList;
