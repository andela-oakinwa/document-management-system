import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Input } from 'react-materialize';
import TinyMCE from 'react-tinymce';
import toastr from 'toastr';
import { updateDocument } from '../../actions/DocumentAction';
import validateInput from '../../utilities/CheckDocument';

class DocumentEdit extends Component {
  /**
   * Instatiates class
   * @param {Object} props
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: props.document.title,
      content: props.document.content,
      access: props.document.access,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  /**
   * Handles on change event
   * @param {Object} event
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  /**
   * Checks if document metadata exist
   */
  isValid() {
    const data = {
      title: this.state.title,
      content: this.state.content,
      access: this.state.access
    };
    const { errors, isValid } = validateInput(data);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * Called when document content is changed
   * @param {Object} event
   */
  handleChange(event) {
    const content = event.target.getContent();
    this.setState({ content });
  }
  /**
   * Called when document is updateed
   * @param {Object} event
   */
  onClickUpdate(event) {
    event.preventDefault();
    const docId = this.props.document.id;
    if (this.isValid()) {
      this.props.updateDocument(docId, this.state)
        .then(() => {
          this.context.router.push('/');
          toastr.success('Document updated');
        });
    }
  }
  /**
   * Renders to the DOM
   */
  render() {
    const { errors } = this.state;
    return (
      <form className="container">
        <h5 className="center" style={{ margin: 20 }}>
          Create/Update a Document
        </h5>
        <Row>
          <div className="input-field col s12 margin-btm">
            <label htmlFor="title" className="active">Title</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              id="title"
              required
            />
            {errors.title && <span className="red-text">Enter Title</span>}
          </div>
          <div className="input-field col s12 margin-btm">
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
            {errors.content && <div className="red-text">Enter Content</div>}
          </div>
          <div className="input-field col s12 margin-btm">
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
          <div className="input-field col s12 margin-btm">
            <Input
              type="submit"
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

DocumentEdit.contextTypes = {
  router: PropTypes.object,
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
};

export default connect(mapStateToProps, { updateDocument })(DocumentEdit);
