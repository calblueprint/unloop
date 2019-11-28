import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core/';

import styles from './styles';

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // store the information from this.props.questionnaire into state
    const questionnaire = {};
    Object.keys(this.props.questionnaire).forEach(k => {
      if (k !== 'id' && k !== 'participant') {
        questionnaire[k] = this.props.questionnaire[k];
      }
    });
    this.setState({
      questionnaire,
    });
  }

  handleSubmit() {
    const qType = `${this.props.type}_questionnaire`;
    let body = {};

    Object.keys(this.state.questionnaire).map(f => {
      body[f] = this.state.questionnaire[f];
    });
    body.participant_id = this.props.participantId;

    body = JSON.stringify({ [qType]: body });

    const { id } = this.props.questionnaire;
    const request = `/api/${qType}s/${id}`;
    fetch(request, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      body,
      credentials: 'same-origin',
    })
      .then(data => {
        window.location.reload();
      })
      .catch(data => {
        console.error(data);
      });
  }

  handleTextFormChange(e) {
    const { id } = e.target;
    const { value } = e.target;
    this.setState(s => ({
      questionnaire: {
        ...s.questionnaire,
        [id]: value,
      },
    }));
  }

  createTextForm(fieldName, fieldValue, contentText) {
    // content text is prompt/title for the text box
    // field name is the name of the field that will be filled in the database
    return (
      <>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          className="dialogContentTextField questionnaireTextField"
          onChange={e => this.handleTextFormChange(e)}
          variant="outlined"
          id={fieldName}
          multiline
          type="text"
          margin="dense"
          defaultValue={fieldValue}
          maxRows={20}
        />
      </>
    );
  }

  createTextForms() {
    if (this.state.questionnaire) {
      const { questionnaire } = this.state;

      const questionnaires = Object.keys(questionnaire).map(f => {
        let sentenceCase = f.charAt(0).toUpperCase() + f.substring(1);
        sentenceCase = sentenceCase.replace(/([-_][a-z])/gi, $1 =>
          $1
            .toUpperCase()
            .replace('-', ' ')
            .replace('_', ' '),
        );

        return this.createTextForm(f, questionnaire[f], sentenceCase);
      });
      return <div>{questionnaires}</div>;
    }
  }

  render() {
    return (
      <>
        <DialogContent>{this.createTextForms()}</DialogContent>
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
      </>
    );
  }
}

QuestionnaireForm.propTypes = {
  type: PropTypes.oneOf(['personal', 'professional']).isRequired,
  participantId: PropTypes.number.isRequired,
  questionnaire: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionnaireForm);
