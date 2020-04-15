import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from '@material-ui/core/styles';
import { apiPut, apiPost, apiPatch } from 'utils/axios';
import { Button } from '@material-ui/core';
import RadioButtonsGroup from './radioButtons';
import styles from './styles';
import { consoleSandbox } from '@sentry/utils';

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
  ]
];


class Question extends React.Component {
  constructor(props) {
    super(props);
    const studioAssessment = {}
    if (this.props.studioAssessment != null) {
        Object.keys(this.props.studioAssessment).forEach(k => {
            studioAssessment[k] = this.props.studioAssessment[k];
        });
    }
    this.state = {
        direction: 'back',
        studioAssessment: studioAssessment
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFinal = this.handleSubmitFinal.bind(this);
    this.generateField = this.generateField.bind(this);
    this.radioButtonHandler = this.radioButtonHandler.bind(this)
  }

//   componentDidMount() {
//     // store the information from this.props.questionnaire into state
//     console.log("this me props")
//     console.log(this.props.studioAssessment)
//     const studioAssessment = {};
//     if (this.props.studioAssessment != null) {
//         Object.keys(this.props.studioAssessment).forEach(k => {
//             studioAssessment[k] = this.props.studioAssessment[k];
//         });
//         this.setState({
//           studioAssessment,
//         });
//     }
//     console.log("my state after mount")
//     console.log(this.state)
//   }
  radioButtonHandler(score) {
      console.log("hi")
      console.log(this.state)
      console.log(score)
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
    console.log({studio_assessment : body})
    const request = `/api/studio_assessments/${id}`;
    if (type == "edit") {}
    apiPatch(request, { studio_assessment : body })
        // .then(() => window.location.reload())
      .catch(error => console.error(error));
  }


  handleSubmitFinal() {
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
    console.log({studio_assessment : body})
    const request = `/api/studio_assessments/${id}`;
    apiPatch(request, { studio_assessment : body })
        .then(() => window.location.reload())
      .catch(error => console.error(error));
  }

  handleTextFormChange(e, questionType) {
      const { value } = e.target;
      console.log(value)
      console.log(questionType)
      this.setState(s => ({
        studioAssessment: {
          ...s.studioAssessment,
          [questionType]: value,
        },
      }));
      console.log("my state")
      console.log(this.state)
  }

  generateField(questionType) {
    return (<Field
                className={this.props.classes.TextField}
                name={`${this.props.questionType}_comment`}
                onChange={e => this.handleTextFormChange(e, `${this.props.questionType}_comment`)}
                variant="outlined"
                id={this.props.questionType}
                multiline
                type="text"
                margin="dense"
                value={this.state.studioAssessment[`${questionType}_comment`] !== null ? 
                    this.state.studioAssessment[`${questionType}_comment`]
                    :
                    ""
                }
                as={TextField}
                />
            );
  }

  render() {
    return (
    <Formik
        initialValues={this.props.formData}
        onSubmit={values => {
        this.state.direction === 'back' ? this.props.prevStep() : this.props.nextStep();
      }}
    >
      <Form className={this.props.classes.form}>
        <h1 className={this.props.classes.header}>{questions[this.props.questionID]}</h1>
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
            score={this.state.studioAssessment[`${this.props.questionType}_score`]}
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
                    className='button'
                    disabled={this.props.questionID === 0 ? true : false}
                    onClick={() => this.setState({direction: 'back'})}
                >
                back
              </Button> 
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              disabled={this.props.questionID === 6 ? true : false}
                onClick={() => this.setState({direction: 'forward'})}
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
};
  
export default withStyles(styles)(Question);
