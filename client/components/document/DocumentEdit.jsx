import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Input } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { updateDocument } from '../../actions/DocumentAction';

class DocumentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.document.title,
      content: props.document.content,
      access: props.document.access
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChange(event) {
    const content = event.target.getContent();
    this.setState({ content });
  }

  onClickUpdate(event) {
    event.preventDefault();
    const docId = this.props.document.id;
    this.props.updateDocument(docId, this.state)
      .then(() => {
        window.history.back();
        toastr.success('Document updated');
      });
  }

  render() {
    return (
      <form className="container">
        <h5 className="center" style={{ margin: 20 }}>
          Create/Update a Document
        </h5>
        <Row>
          <div className="input-field col s12" style={{ marginBottom: 10 }}>
            <label htmlFor="title" className="active">Title</label>
            <input
              type="text"
              validate
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              id="title"
            />
            {/*{errors.title && <span className="red-text">Enter Title</span>}*/}
          </div>
          <div className="input-field col s12" style={{ marginBottom: 10 }}>
            <TinyMCE
              id="content"
              config={{
                plugins: 'autolink link image lists print preview',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
              }}
              name="content"
              content={this.state.content}
              onChange={this.handleChange}
            />
            {/*{errors.content && <div className="red-text">Enter Content</div>}*/}
          </div>
          <div className="input-field col s12" style={{ marginBottom: 10 }}>
            <select
              style={{ display: 'block' }}
              id="access"
              value={this.state.access}
              onChange={this.onChange}
              name="access"
            >
              <option defaultValue>Select Access</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
          </div>
          <div className="input-field col s12" style={{ marginBottom: 10 }}>
            <Input
              type="submit"
              // disabled={saving}
              // value={saving ? 'Saving...' : 'Save'}
              className="btn waves-effect waves-light blue"
              onClick={this.onClickUpdate}
            />
          </div>
        </Row>
      </form>
    );
  }
}

DocumentEdit.propTypes = {
  document: PropTypes.object.isRequired,
  updateDocument: PropTypes.func.isRequired,
};

/**
 * Maps state to props
 * @param {Object} state
 * @param {Object} ownProps
 * @returns {Object} - current document
 */
const mapStateToProps = (state, ownProps) => {
  const documentId = ownProps.params.id;
  let document = {};
  state.documents.forEach((doc) => {
    const curDocumentId = String(doc.id);
    if (curDocumentId === documentId) {
      document = doc;
    }
  });

  return { document };
}

export default connect(mapStateToProps, { updateDocument })(DocumentEdit);
