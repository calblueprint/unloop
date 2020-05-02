import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as Sentry from '@sentry/browser';
import { apiPut } from 'utils/axios';
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
    const body = {};

    Object.keys(this.state.questionnaire).forEach(f => {
      body[f] = this.state.questionnaire[f];
    });
    body.participant_id = this.props.participantId;

    const { id } = this.props.questionnaire;
    const request = `/api/${qType}s/${id}`;

    apiPut(request, { [qType]: body })
      .then(() => window.location.reload())
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'QuestionnaireForm');
          scope.setExtra('action', 'apiPut');
          scope.setExtra('QuestionnaireForm', body);
          scope.setExtra('qType', qType);
        });
        Sentry.captureException(error);
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
      <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText>{contentText}</DialogContentText>
        <TextField
          className={`${this.props.classes.dialogContentTextField} ${this.props.classes.questionnaireTextField}`}
          onChange={e => this.handleTextFormChange(e)}
          variant="outlined"
          id={fieldName}
          multiline
          type="text"
          margin="dense"
          defaultValue={fieldValue}
          maxRows={20}
        />
      </div>
    );
  }

  // eslint-disable-next-line consistent-return
  createTextForms() {
    if (this.state.questionnaire) {
      let { questionnaire } = this.state;

      let questionnaires = Object.keys(questionnaire).map(f => {
        let sentenceCase = f.charAt(0).toUpperCase() + f.substring(1);
        sentenceCase = sentenceCase.replace(/([-_][a-z])/gi, $1 =>
          $1
            .toUpperCase()
            .replace('-', ' ')
            .replace('_', ' '),
        );

        return (
          <div key={f}>
            {this.createTextForm(f, questionnaire[f], sentenceCase)}
          </div>
        );
      });
      questionnaires.push(this.getFileUpload());
      return <div className={styles.container}>{questionnaires}</div>;
    }
  }

  getFileUpload(){
    return(<Button
      variant="contained"
      component="label"
      onPress={(event) => console.log(event.target.value)}
      >
        Upload Resume
    <input
        type="file"
        style={{ display: "none" }}
        />
  </Button>);
  }

  render() {
    return (
      <>
        <DialogContent>{this.createTextForms()}</DialogContent>
        <div className={this.props.classes.buttonContainer}>
          <DialogActions className={this.props.classes.DialogActions}>
            
            <Button
              onClick={this.props.handleClose}
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
        </div>
      </>
    );
  }
}

QuestionnaireForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['personal', 'professional']).isRequired,
  participantId: PropTypes.number.isRequired,
  questionnaire: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
};

export default withStyles(styles)(QuestionnaireForm);
