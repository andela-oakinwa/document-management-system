import React from 'react';
import shortId from 'shortid';
/*import { Pagination } from 'react-materialize';*/
import DocumentCard from './DocumentCard';
/**
 * Component defined as a function.
 */
const DocumentsList = ({ documents,
  deleteDocument, currentUser, filtered, notFiltered }) => {
  const emptyMessage = (<p>No documents Found</p>),
    isFiltered = filtered ? documents : notFiltered,
    documentsList = (
      <div>
        {isFiltered.map(allDocuments => <DocumentCard
        key={shortId.generate()}
        document={allDocuments}
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
