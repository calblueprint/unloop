import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { apiPost, apiPatch } from 'utils/axios';
import { Button } from '@material-ui/core';
import RadioButtonsGroup from './radioButtons';
import styles from './styles';
import * as questions from './questions';


class Question extends React.Component {
  constructor(props) {
    super(props);
    const studioAssessment = {};
    if (this.props.studioAssessment != null) {
      Object.keys(this.props.studioAssessment).forEach(k => {
        studioAssessment[k] = this.props.studioAssessment[k];
      });
    }
    this.state = {
      direction: 'back',
      studioAssessment,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFinal = this.handleSubmitFinal.bind(this);
    this.generateField = this.generateField.bind(this);
    this.radioButtonHandler = this.radioButtonHandler.bind(this);
  }

  radioButtonHandler(score) {
    this.setState(s => ({
      studioAssessment: {
        ...s.studioAssessment,
        [`${this.props.questionType}_score`]: parseInt(score, 10),
      },
    }));
  }

  handleSubmit() {
    const { id } = this.props.studioAssessment;
    const body = {};
    if (this.state.studioAssessment != null) {
      Object.keys(this.state.studioAssessment).forEach(f => {
        if (f !== 'id' && f !== 'participant') {
          body[f] = this.state.studioAssessment[f];
        }
      });
    }
    body.participant_id = this.props.participantId;
    const request = `/api/studio_assessments/${id}`;
    apiPatch(request, { studio_assessment: body });
  }

  handleSubmitFinal() {
    const body = {};
    if (this.state.studioAssessment != null) {
      Object.keys(this.state.studioAssessment).forEach(f => {
        if (f !== 'participant') {
          body[f] = this.state.studioAssessment[f];
        }
      });
    }
    body.participant_id = this.props.participantId;

    if (this.props.type === 'create') {
      apiPost('/api/studio_assessments', { studio_assessment: body }).then(() =>
        window.location.reload(),
      );
    } else {
      const { id } = this.props.studioAssessment;
      const request = `/api/studio_assessments/${id}`;
      apiPatch(request, { studio_assessment: body }).then(() =>
        window.location.reload(),
      );
    }
  }

  handleTextFormChange(e, questionType) {
    const { value } = e.target;
    this.setState(s => ({
      studioAssessment: {
        ...s.studioAssessment,
        [questionType]: value,
      },
    }));
  }

  generateField(questionType) {
    return (
      <Field
        className={this.props.classes.TextField}
        name={`${this.props.questionType}_comment`}
        onChange={e =>
          this.handleTextFormChange(e, `${this.props.questionType}_comment`)
        }
        variant="outlined"
        id={this.props.questionType}
        multiline
        type="text"
        margin="dense"
        value={
          this.state.studioAssessment[`${questionType}_comment`] !== null
            ? this.state.studioAssessment[`${questionType}_comment`]
            : ''
        }
        as={TextField}
      />
    );
  }

  render() {
    var rubric;
    var comment;
    if (this.props.type === "view") {
      rubric = <div>{this.state.studioAssessment[`${this.props.questionType}_score`] !== null ? 
      <div>
        <h3>Score: {this.state.studioAssessment[`${this.props.questionType}_score`].toString()}</h3>
        <p>{rubricItems[this.state.studioAssessment[`${this.props.questionType}_score`]]}</p>
      </div>
      :
      <div>
        <h3>Score:</h3>
        <p>No score entered yet</p>
      </div>
      }</div>
      comments = <div>
        <h3>Comments</h3>
            <p>
              {this.state.studioAssessment[`${this.props.questionType}_comment`] !== null
                ? this.state.studioAssessment[`${this.props.questionType}_comment`]
                : 'No comment yet'}
            </p>
      </div>
    } else if (this.props.type !== "view"){
      rubric = <RadioButtonsGroup
      rubricItems={questions.rubricItems[this.props.questionID]}
      questionType={this.props.questionType}
      score={
        this.state.studioAssessment[`${this.props.questionType}_score`]
      }
      radioHandler={this.radioButtonHandler}
      />
      comments = <div><h3>Enter comments below:</h3>
      {this.generateField(this.props.questionType)}</div>
    }


    return (
      <Formik
        initialValues={this.props.formData}
        onSubmit={() => {
          this.state.direction === 'back'
            ? this.props.prevStep()
            : this.props.nextStep();
        }}
      >
        <Form className={this.props.classes.form}>
          <h1 className={this.props.classes.header}>
            {questions.questions[this.props.questionID]}
          </h1>
          <div className={this.props.classes.questions}>
            <p>
              {questions.questionContent[this.props.questionID].map(item => (
                <li>{item}</li>
              ))}
            </p>
          </div>
          <div className={this.props.classes.radio}>
            {rubric}
          </div>
          <div className={this.props.classes.comments}>
            {comment}
            <div className={this.props.classes.buttons}>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                disabled={this.props.questionID === 0}
                onClick={() => this.setState({ direction: 'back' })}
              >
                back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={this.props.classes.button}
                disabled={this.props.questionID === 6}
                onClick={() => this.setState({ direction: 'forward' })}
              >
                next
              </Button>
              {this.props.type !== 'view' ? 
              <Button
                variant="contained"
                color="secondary"
                className={this.props.classes.button}
                onClick={this.handleSubmitFinal}
              >
                save and close
              </Button> : 
                <div></div>
              }
              <br />
            </div>
          </div>
        </Form>
      </Formik>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  studioAssessment: PropTypes.object.isRequired,
  participantId: PropTypes.number.isRequired,
  formData: PropTypes.object,
  questionType: PropTypes.string.isRequired,
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  questionID: PropTypes.number,
  type: PropTypes.string,
};

export default withStyles(styles)(Question);
