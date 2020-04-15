import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { apiPost, apiPatch } from 'utils/axios';
import { Button } from '@material-ui/core';
// import { consoleSandbox } from '@sentry/utils';
import RadioButtonsGroup from './radioButtons';
import styles from './styles';

const questions = [
  'Understands the Big Picture of the Full Stack',
  'JavaScript Fundamentals',
  'Understands Version Control',
  'React Core Competencies',
  'NodeJs Core Competencies',
  'Database Core Competencies',
  'Problem Solving: Whiteboarding',
];

const questionContent = [
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
  [
    'Describe the roles of Html,Javascript, and CSS in a webpage.',
    'What distinguishes a web application from a static webpage?',
  ],
];

const rubricItems = [
  [
    'While they may recognize technologies, the student cannot articulate roles of varying technologies, let alone be able to decide what technology to use for a particular need or how it fits into the bigger picture.',
    'The student articulates that there are different technologies with varied roles, can name the technologies involved with different roles, but struggles to decide what technology or role is involved in a particular domain. Also struggles with understanding how the technologies fit together.',
    'The student articulates the varied technologies in a web stack, their roles, the roles of the client and server, how these technologies/roles fit together and can (mostly) decided where to implement varied needs such as authorization, validation, persistence, etc.',
  ],

  [
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
  ],

  [
    'Describe the roles of Html, Javascript, and CSS in a web page.',
    'Describe the roles of Html, Javascript, and CSS in a web page.',
    'Describe the roles of Html, Javascript, and CSS in a web page.',
  ],

  [
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
  ],

  [
    'Describe the roles of Html, Javascript, and CSS in a web page.',
    'Describe the roles of Html, Javascript, and CSS in a web page.',
    'Describe the roles of Html, Javascript, and CSS in a web page.',
  ],

  [
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
  ],
  [
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
    'Explain the difference between var, let, and const?',
  ],
];

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
    apiPatch(request, { studio_assessment: body })
      // .then(() => window.location.reload())
      // .catch(error => console.error(error));
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
      apiPatch(request, { studio_assessment: body })
        .then(() => window.location.reload())
        // .catch(error => console.error(error));
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
            {questions[this.props.questionID]}
          </h1>
          <div className={this.props.classes.questions}>
            <p>
              {questionContent[this.props.questionID].map(item => (
                <li>{item}</li>
              ))}
            </p>
          </div>
          <div className={this.props.classes.radio}>
            <RadioButtonsGroup
              rubricItems={rubricItems[this.props.questionID]}
              questionType={this.props.questionType}
              score={
                this.state.studioAssessment[`${this.props.questionType}_score`]
              }
              radioHandler={this.radioButtonHandler}
            />
          </div>
          <div className={this.props.classes.comments}>
            <h3>Enter comments below:</h3>
            {this.generateField(this.props.questionType)}
            <div className={this.props.classes.buttons}>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button"
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
              <Button
                variant="contained"
                color="secondary"
                className={this.props.classes.button}
                onClick={this.handleSubmitFinal}
              >
                save and close
              </Button>
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
  type: PropTypes.string
};

export default withStyles(styles)(Question);
