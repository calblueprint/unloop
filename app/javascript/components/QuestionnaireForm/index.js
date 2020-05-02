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
import ActiveStorageProvider from 'react-activestorage-provider'

class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
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
    const file = this.state.file;
    Object.keys(this.state.questionnaire).forEach(f => {
      body[f] = this.state.questionnaire[f];
    });
    if(file !== null){
      body.resume = file;
    }
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
      questionnaires.push(this.getOldFileUpload());
      return <div className={styles.container}>{questionnaires}</div>;
    }
  }

  getFileUpload(){
    const { id } = this.props.questionnaire;
    const paths = `/api/professional_questionnaire/${id}`;
    return(
    <ActiveStorageProvider
    endpoint={{
      path: paths,
      model: 'professional_questionnaire',
      attribute: 'resume',
      method: 'create',
    }}
    onSubmit={questionnaire => this.setState({ file: questionnaire.resume})}
    render={({ handleUpload, uploads, ready }) => (
      <div>
        <input
          type="file"
          disabled={!ready}
          onChange={e => handleUpload(e.currentTarget.files)}
        />

        {uploads.map(upload => {
          switch (upload.state) {
            case 'waiting':
              return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
            case 'uploading':
              return (
                <p key={upload.id}>
                  Uploading {upload.file.name}: {upload.progress}%
                </p>
              )
            case 'error':
              return (
                <p key={upload.id}>
                  Error uploading {upload.file.name}: {upload.error}
                </p>
              )
            case 'finished':
              return (
                <p key={upload.id}>Finished uploading {upload.file.name}</p>
              )
          }
        })}
      </div>
      )}
    />
    );
  }

  getOldFileUpload(){
    return(
    <input
        type="file"
        
        onChange = {(event) => {
          console.log(event.target.files[0]);
          console.log(event.target.files);
          this.setState( {file: event.target.files[0]})
          }}
        />
  );
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
