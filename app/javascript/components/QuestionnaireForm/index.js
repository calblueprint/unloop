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
} from '@material-ui/core/';
import styles from './styles';

// function getSteps() {
//   return [
//     'Personal Information',
//     'Personal Relationships',
//     'Health and Wellness',
//   ];
// }

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
    console.log(value);
    this.setState(s => ({
      questionnaire: {
        ...s.questionnaire,
        [fieldName]: value,
      },
    }));
  }

  createTextForm(fieldName, fieldValue, contentText) {
    // content text is prompt/title for the text box
    // field name is the name of the field that will be filled in the database
    if (fieldName === "DOC_status") {
      return (
        <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText>{contentText}</DialogContentText>
        <RadioGroup
          id={fieldName}
        >
          <FormControlLabel value="WR" control={<Radio />} label="WR" onChange={e => this.handleRadioChange(e, fieldName, "WR")} checked={this.state.questionnaire["DOC_status"] === "WR"}/>
          <FormControlLabel value="GRE" control={<Radio />} label="GRE" onChange={e => this.handleRadioChange(e, fieldName, "GRE")} checked={this.state.questionnaire["DOC_status"] === "GRE"} />
          <FormControlLabel value="Community placement" control={<Radio />} label="Community Placement" onChange={e => this.handleRadioChange(e, fieldName, "Community Placement")} checked={this.state.questionnaire["DOC_status"] === "Community Placement"}/>
          <FormControlLabel value="Released with placement" control={<Radio />} label="Released with placement" onChange={e => this.handleRadioChange(e, fieldName, "Released with placement")} checked={this.state.questionnaire["DOC_status"] === "Released with placement"}/>
          <FormControlLabel value="Released without placement" control={<Radio />} label="Released without placement" onChange={e => this.handleRadioChange(e, fieldName, "Released without placement")} checked={this.state.questionnaire["DOC_status"] === "Released without placement"} />
        </RadioGroup>
      </div>
      );
    } 
    else if (fieldName === "race_and_ethnicities") {
      return (
        <div className={this.props.classes.questionnaireEntry}>
          <DialogContentText>{contentText}</DialogContentText>
          <Select
          id={fieldName}
          value={this.state.questionnaire["race_and_ethnicities"]}
          onChange={e => this.handleSelectChange(e, fieldName)}
          >
            <MenuItem value={"American Indian or Alaska Native"}>American Indian or Alaska Native</MenuItem>
            <MenuItem value={"Asian"}>Asian</MenuItem>
            <MenuItem value={"Black or African American"}>Black or African American</MenuItem>
            <MenuItem value={"Hispanic or Latino or Spanish Origin"}>Hispanic or Latino or Spanish Origin</MenuItem>
            <MenuItem value={"Native Hawaiian or Other Pacific Islander"}>Native Hawaiian or Other Pacific Islander</MenuItem>
            <MenuItem value={"Two or More Races"}>Two or More Races</MenuItem>
            <MenuItem value={"White"}>White</MenuItem>
            <MenuItem value={"Prefer Not to Say"}>Prefer Not to Say</MenuItem>
          </Select>
        </div>
      );
    }
    else if (fieldName === "course_completion") {
      return (
        <div className={this.props.classes.questionnaireEntry}>
        <DialogContentText>{contentText}</DialogContentText>
        <RadioGroup
          id={fieldName}
        >
          <FormControlLabel value="completed" control={<Radio />} label="completed" onChange={e => this.handleRadioChange(e, fieldName, "completed")} checked={this.state.questionnaire["course_completion"] === "completed"}/>
          <FormControlLabel value="incomplete" control={<Radio />} label="incomplete" onChange={e => this.handleRadioChange(e, fieldName, "incomplete")} checked={this.state.questionnaire["course_completion"] === "incomplete"} />
        </RadioGroup>
      </div>
      );
    }
    else {
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

        return (
          <div key={f}>
            {this.createTextForm(f, questionnaire[f], sentenceCase)}
          </div>
        );
      });
      return <div className={styles.container}>{questionnaires}</div>;
    }
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
