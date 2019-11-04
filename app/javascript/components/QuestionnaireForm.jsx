import React from 'react';
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/personal_questionnaires.scss';
import {
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from '@material-ui/core/';
import PropTypes from 'prop-types';

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClose = this._handleClose.bind(this);
    this.handleOpen = this._handleOpen.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  _handleOpen() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }

  _handleSubmit() {
    let qType = this.props.questionnaireType.toLowerCase() + "_questionnaire"
    let fields = this.getProperFields();
    let body = {};

    fields.map(f => {
      body[f] = this.state[f];
    });
    body['participant_id'] = this.props.participant_id;


    body = JSON.stringify({ [qType]: body });

    let request =
      '/api/' + qType + 's/';
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      body: body,
      credentials: 'same-origin',
    })
      .then(data => {
        window.location.reload();
      })
      .catch(data => {
        console.error(data);
      });
  }

  createTextForm(fieldName, contentText) {
    // content text is prompt/title for the text box
    // field name is the name of the field that will be filled in the database
    return (
      <DialogContent>
        <TextField
          className="dialogContentTextField"
          onChange={e => this.setState({ [fieldName]: e.target.value })}
          variant="outlined"
          id={fieldName}
          label={contentText}
          multiline
          type="text"
          margin="dense"
        />
      </DialogContent>
    );
  }

  getProperFields() {
    return this.props.fields.filter(f => {
      return (
        f !== 'id' &&
        f !== 'created_at' &&
        f !== 'updated_at' &&
        f !== 'participant_id'
      );
    });
  }

  createTextForms() {
    let fields = this.getProperFields();

    let form = fields.map(f => {
      let sentenceCase = f.charAt(0).toUpperCase() + f.substring(1);
      sentenceCase = sentenceCase.replace(/([-_][a-z])/gi, $1 => {
        return $1
          .toUpperCase()
          .replace('-', ' ')
          .replace('_', ' ');
      });

      return this.createTextForm(f, sentenceCase);
    });
    return <div>{form}</div>;
  }

  render() {
    const qType = this.props.questionnaireType;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          {qType} Questionnaire
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <h2 className="dialogTitle"> Intake Form </h2>
          </DialogTitle>
          {this.createTextForms()}
          <DialogActions className="dialogActions">
            <Button
              onClick={this.handleClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="outlined"
              color="primary"
            >
              Save Document
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

QuestionnaireForm.propTypes = {
  fields: PropTypes.array,
  participant_id: PropTypes.number,
};

export default QuestionnaireForm;
