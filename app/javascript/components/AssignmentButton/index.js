import React from 'react';
import { apiPost, apiPatch, apiDelete } from 'utils/axios';
import { Button } from '@material-ui/core/';

class AssignmentButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate() {
    const payload = {
      title: this.state.title,
      description: this.state.description,
      assigned_to_ids: [10, 22, 14, 12],
    };
    apiPost(`/api/assignments/`, { assignment: payload })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  handleUpdate() {
    const payload = { title: 'NEW TITLE WOOHOOOOO' };
    apiPatch(`/api/assignments/${5}`, { assignment: payload })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  handleDeleteSubmit() {
    apiDelete(`/api/assignments/${3}`)
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  handleTemplateCreate() {
    const payload = { title: 'SECOND NEW TITLE!', description: 'PLEASE WORK!' };
    apiPost('/api/assignments/templates', { assignment: payload })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  handleTemplateUpdate() {
    const payload = { title: 'THIS IS A CHANGED TITLE TWO!' };
    apiPatch(`api/assignments/templates/1`, { assignment: payload })
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  handleTemplateDelete() {
    apiDelete(`api/assignments/templates/1`)
      .then(resp => console.log(resp))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <p>
          {' '}
          Request response is console logged, so open console and press buttons
        </p>
        <Button
          onClick={this.handleCreate}
          variant="outlined"
          color="secondary"
        >
          Create
        </Button>
        <Button
          onClick={this.handleUpdate}
          variant="outlined"
          color="secondary"
        >
          Update
        </Button>
        <Button
          onClick={this.handleDelete}
          variant="outlined"
          color="secondary"
        >
          Delete
        </Button>
        <Button
          onClick={this.handleTemplateCreate}
          variant="outlined"
          color="secondary"
        >
          Create Template
        </Button>
        <Button
          onClick={this.handleTemplateUpdate}
          variant="outlined"
          color="secondary"
        >
          Update Template
        </Button>
        <Button
          onClick={this.handleTemplateDelete}
          variant="outlined"
          color="secondary"
        >
          Delete Template
        </Button>
      </div>
    );
  }
}

export default AssignmentButton;
