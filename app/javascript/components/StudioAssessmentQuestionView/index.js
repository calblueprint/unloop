import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { apiPost, apiPatch } from 'utils/axios';
import { Button } from '@material-ui/core';
// import { consoleSandbox } from '@sentry/utils';
// import RadioButtonsGroup from './radioButtons';
// import styles from './styles';

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

class QuestionView extends React.Component {
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
            {this.state.studioAssessment[`${this.props.questionType}_score`] !== null ? (
              <div>
                <h3>
                  Score:{' '}
                  {this.state.studioAssessment[
                    `${this.props.questionType}_score`
                  ].toString()}
                </h3>
                <p>
                  {
                    rubricItems[
                      this.state.studioAssessment[
                        `${this.props.questionType}_score`
                      ]
                    ]
                  }
                </p>
              </div>
            ) : (
              <div>
                <h3>Score:</h3>
                <p>No score entered yet</p>
              </div>
            )}
          </div>
          <div className={this.props.classes.radio}>
            <h3>Comments</h3>
            <p>
              {this.state.studioAssessment[
                `${this.props.questionType}_comment`
              ] !== null
                ? this.state.studioAssessment[
                    `${this.props.questionType}_comment`
                  ]
                : 'No comment yet'}
            </p>
          </div>
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
            <br />
          </div>
        </Form>
      </Formik>
    );
  }
}

QuestionView.propTypes = {
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

export default withStyles(styles)(QuestionView);
