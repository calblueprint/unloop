import React from 'react';
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/personal_questionnaires.scss';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core/';
import PropTypes from 'prop-types';

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // store the information from this.props.questionnaire into state
    const questionnaire = {};
    Object.keys(this.props.questionnaire).forEach(k => {
      if (
        k !== 'id' &&
        k !== 'created_at' &&
        k !== 'updated_at' &&
        k !== 'participant_id'
      ) {
        questionnaire[k] = this.props.questionnaire[k];
      }
    });
    this.setState({
      questionnaire,
    });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    const qType = `${this.props.questionnaireType.toLowerCase()}_questionnaire`;
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
      <DialogContent>
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
      </DialogContent>
    );
  }

  // eslint-disable-next-line consistent-return
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
            <h2 className="dialogTitle"> {qType} Questionnaire </h2>
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
  questionnaire: PropTypes.array,
  participantId: PropTypes.number,
  questionnaireType: PropTypes.string,
};

export default QuestionnaireForm;
