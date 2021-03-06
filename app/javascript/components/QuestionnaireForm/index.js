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
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Input,
  Typography,
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from './styles';

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
      validPhone: true,
    });
  }

  handleSubmit() {
    if (this.props.type === 'professional') {
      const formData = new FormData();

      Object.keys(this.state.questionnaire).forEach(f => {
        if (this.state.questionnaire[f]) {
          formData.append(
            `professional_questionnaire[${f}]`,
            this.state.questionnaire[f],
          );
        } else {
          formData.append(`professional_questionnaire[${f}]`, '');
        }
      });
      formData.append(`professional_questionnaire[resume]`, this.state.file);
      formData.append(
        `professional_questionnaire[participant_id]`,
        this.props.participantId,
      );
      const { id } = this.props.questionnaire;
      const request = `/api/professional_questionnaires/${id}`;
      apiPut(request, formData)
        .then(() => window.location.reload())
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'QuestionnaireForm');
            scope.setExtra('action', 'apiPut');
            scope.setExtra('QuestionnaireForm', JSON.stringify(formData));
            scope.setExtra('qType', 'professional_questionnaire');
          });
          Sentry.captureException(error);
        });
    } else {
      const body = {};
      Object.keys(this.state.questionnaire).forEach(f => {
        body[f] = this.state.questionnaire[f];
      });
      body.participant_id = this.props.participantId;

      const { id } = this.props.questionnaire;
      const request = `/api/personal_questionnaires/${id}`;

      apiPut(request, { personal_questionnaire: body })
        .then(() => window.location.reload())
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'QuestionnaireForm');
            scope.setExtra('action', 'apiPut');
            scope.setExtra('QuestionnaireForm', body);
            scope.setExtra('qType', 'Personal Questionnaire');
          });
          Sentry.captureException(error);
        });
    }
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

  handlePhoneChange(e) {
    const { id } = e.target;
    const { value } = e.target;
    const regex = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    const isValid = regex.test(value);
    if (isValid || value === '') {
      this.setState(s => ({
        validPhone: true,
        questionnaire: {
          ...s.questionnaire,
          [id]: value,
        },
      }));
    } else {
      this.setState(s => ({
        validPhone: false,
        questionnaire: {
          ...s.questionnaire,
          [id]: value,
        },
      }));
    }
  }

  handleRadioChange(e, fieldName, newValue) {
    this.setState(s => ({
      questionnaire: {
        ...s.questionnaire,
        [fieldName]: newValue,
      },
    }));
  }

  handleSelectChange(e, fieldName) {
    const { value } = e.target;
    this.setState(s => ({
      questionnaire: {
        ...s.questionnaire,
        [fieldName]: value,
      },
    }));
  }

  handleDateChange(date, fieldName) {
    if (date != null) {
      date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
    }

    this.setState(s => ({
      questionnaire: {
        ...s.questionnaire,
        [fieldName]: date,
      },
    }));
  }

  createTextForm(fieldName, fieldValue, contentText) {
    // content text is prompt/title for the text box
    // field name is the name of the field that will be filled in the database
    if (fieldName === 'DOC_status') {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText className={this.props.classes.questionnaireLabel}>
            {contentText}
          </DialogContentText>
          <RadioGroup id={fieldName} className={this.props.classes.radioGroup}>
            <FormControlLabel
              value="WR"
              control={<Radio />}
              label="WR"
              onChange={e => this.handleRadioChange(e, fieldName, 'WR')}
              checked={this.state.questionnaire.DOC_status === 'WR'}
            />
            <FormControlLabel
              value="GRE"
              control={<Radio />}
              label="GRE"
              onChange={e => this.handleRadioChange(e, fieldName, 'GRE')}
              checked={this.state.questionnaire.DOC_status === 'GRE'}
            />
            <FormControlLabel
              value="Community placement"
              control={<Radio />}
              label="Community Placement"
              onChange={e =>
                this.handleRadioChange(e, fieldName, 'Community Placement')
              }
              checked={
                this.state.questionnaire.DOC_status === 'Community Placement'
              }
            />
            <FormControlLabel
              value="Released with placement"
              control={<Radio />}
              label="Released with placement"
              onChange={e =>
                this.handleRadioChange(e, fieldName, 'Released with placement')
              }
              checked={
                this.state.questionnaire.DOC_status ===
                'Released with placement'
              }
            />
            <FormControlLabel
              value="Released without placement"
              control={<Radio />}
              label="Released without placement"
              onChange={e =>
                this.handleRadioChange(
                  e,
                  fieldName,
                  'Released without placement',
                )
              }
              checked={
                this.state.questionnaire.DOC_status ===
                'Released without placement'
              }
            />
          </RadioGroup>
        </div>
      );
    }
    if (fieldName === 'race_and_ethnicities') {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText className={this.props.classes.questionnaireLabel}>
            {contentText}
          </DialogContentText>
          <FormControl>
            <InputLabel className={this.props.classes.selectLabelText}>
              Select Race/Ethnicity
            </InputLabel>
            <Select
              id={fieldName}
              value={this.state.questionnaire.race_and_ethnicities}
              onChange={e => this.handleSelectChange(e, fieldName)}
              className={this.props.classes.selectMenu}
            >
              <MenuItem value="American Indian or Alaska Native">
                American Indian or Alaska Native
              </MenuItem>
              <MenuItem value="Asian">Asian</MenuItem>
              <MenuItem value="Black or African American">
                Black or African American
              </MenuItem>
              <MenuItem value="Hispanic or Latino or Spanish Origin">
                Hispanic or Latino or Spanish Origin
              </MenuItem>
              <MenuItem value="Native Hawaiian or Other Pacific Islander">
                Native Hawaiian or Other Pacific Islander
              </MenuItem>
              <MenuItem value="Two or More Races">Two or More Races</MenuItem>
              <MenuItem value="White">White</MenuItem>
              <MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
            </Select>
          </FormControl>
        </div>
      );
    }
    if (fieldName === 'course_completion') {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText className={this.props.classes.questionnaireLabel}>
            {contentText}
          </DialogContentText>
          <RadioGroup id={fieldName} className={this.props.classes.radioGroup}>
            <FormControlLabel
              value="completed"
              control={<Radio />}
              label="completed"
              onChange={e => this.handleRadioChange(e, fieldName, 'completed')}
              checked={
                this.state.questionnaire.course_completion === 'completed'
              }
            />
            <FormControlLabel
              value="incomplete"
              control={<Radio />}
              label="incomplete"
              onChange={e => this.handleRadioChange(e, fieldName, 'incomplete')}
              checked={
                this.state.questionnaire.course_completion === 'incomplete'
              }
            />
          </RadioGroup>
        </div>
      );
    }
    if (fieldName === 'birthdate') {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText className={this.props.classes.questionnaireLabel}>
            {contentText}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              value={this.state.questionnaire.birthdate}
              onChange={e => this.handleDateChange(e, fieldName)}
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
        </div>
      );
    }
    if (fieldName === 'phone_number') {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText className={this.props.classes.questionnaireLabel}>
            {contentText}
          </DialogContentText>
          <TextField
            className={`${this.props.classes.dialogContentTextField} ${this.props.classes.questionnaireTextField}`}
            onChange={e => this.handlePhoneChange(e)}
            error={!this.state.validPhone}
            helperText={
              !this.state.validPhone ? 'Please enter a valid phone number.' : ''
            }
            variant="outlined"
            id={fieldName}
            multiline
            type="text"
            margin="dense"
            value={fieldValue}
            rowsMax={20}
          />
        </div>
      );
    }

    return (
      <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText className={this.props.classes.questionnaireLabel}>
          {contentText}
        </DialogContentText>
        <TextField
          className={`${this.props.classes.dialogContentTextField} ${this.props.classes.questionnaireTextField}`}
          onChange={e => this.handleTextFormChange(e)}
          variant="outlined"
          id={fieldName}
          multiline
          type="text"
          margin="dense"
          value={fieldValue}
          rowsMax={20}
        />
      </div>
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

        if (f === 'emergency_contact_2_name') {
          sentenceCase = 'Second Emergency Contact (optional)';
        } else if (f === 'emergency_contact_2_phone_number') {
          sentenceCase = 'Second Emergency Contact Phone Number (optional)';
        } else if (f === 'emergency_contact_2_relationship') {
          sentenceCase = 'Second Emergency Contact Relationship (optional)';
        }

        return this.createTextForm(f, questionnaire[f], sentenceCase);
      });
      if (this.props.type === 'professional') {
        questionnaires.push(this.showUploadedFile());
        questionnaires.push(this.getFileUpload());
      }
      return <div className={styles.container}>{questionnaires}</div>;
    }
  }

  getFileUpload() {
    return (
      <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText>Upload New Resume</DialogContentText>
        <Input
          type="file"
          onChange={event => {
            this.setState({ file: event.target.files[0] });
          }}
        />
      </div>
    );
  }

  showUploadedFile() {
    const { file } = this.state;
    if (file) {
      const objectURL = window.URL.createObjectURL(file);
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText>View Resume</DialogContentText>
          <Button
            className={this.props.classes.buttonStyle}
            onClick={() => window.open(objectURL, '_blank')}
          >
            View File
          </Button>
        </div>
      );
    }

    if (this.props.resumeURL) {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText>View Resume</DialogContentText>
          <Button
            size="small"
            className={this.props.classes.buttonStyle}
            onClick={() => window.open(this.props.resumeURL, '_blank')}
          >
            View File
          </Button>
        </div>
      );
    }
    return (
      <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText>View Resume</DialogContentText>
        <Typography variant="overline">No Resume Uploaded</Typography>
      </div>
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
  handleClose: PropTypes.func.isRequired,
  resumeURL: PropTypes.string,
};

export default withStyles(styles)(QuestionnaireForm);
