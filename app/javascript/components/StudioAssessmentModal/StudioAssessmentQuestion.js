import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  form: {
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
  },
  questions: {
    backgroundColor: theme.palette.common.lightBlue,
    padding: '20px',
    borderRadius: '10px',
  },
  header: {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  button: {
    margin: theme.spacing(1),
    width: '20%',
  },
  TextField: {
    width: '100%',
    paddingBottom: '20px',
  },
  radio: {
    paddingBottom: '20px',
  },
  comments: {
    paddingBottom: '50px',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'right',
  },
}));

// this is what i need to work on
// function handleSubmit() {
//   const qType = `${this.props.type}_questionnaire`;
//   const body = {};

//   Object.keys(this.state.questionnaire).forEach(f => {
//     body[f] = this.state.questionnaire[f];
//   });
//   body.participant_id = this.props.participantId;

//   const { id } = this.props.questionnaire;
//   const request = `/api/${qType}s/${id}`;

//   apiPut(request, { [qType]: body })
//     .then(() => window.location.reload())
//     .catch(error => console.error(error));
// }

export const Question = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
  questionID,
  questionType,
}) => {
  const classes = useStyles();
  const [direction, setDirection] = useState('back');
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
      '1 - NOT READY: \n While they may recognize technologies, the student cannot articulate roles of varying technologies, let alone be able to decide what technology to use for a particular need or how it fits into the bigger picture.',
      '2 - UNCERTAIN: \n The student articulates that there are different technologies with varied roles, can name the technologies involved with different roles, but struggles to decide what technology or role is involved in a particular domain. Also struggles with understanding how the technologies fit together.',
      '3 - PROFICIENT: \n The student articulates the varied technologies in a web stack, their roles, the roles of the client and server, how these technologies/roles fit together and can (mostly) decided where to implement varied needs such as authorization, validation, persistence, etc.',
    ],

    [
      '1 - NOT READY: Explain the difference between var, let, and const?',
      '2 - UNCERTAIN: Explain the difference between var, let, and const?',
      '3 - PROFICIENT: Explain the difference between var, let, and const?',
    ],

    [
      '1 - NOT READY: Describe the roles of Html, Javascript, and CSS in a web page.',
      '2 - UNCERTAIN: Describe the roles of Html, Javascript, and CSS in a web page.',
      '3 - PROFICIENT: Describe the roles of Html, Javascript, and CSS in a web page.',
    ],

    [
      '1 - NOT READY: Explain the difference between var, let, and const?',
      '2 - UNCERTAIN: Explain the difference between var, let, and const?',
      '3 - PROFICIENT: Explain the difference between var, let, and const?',
    ],

    [
      '1 - NOT READY: Describe the roles of Html, Javascript, and CSS in a web page.',
      '2 - UNCERTAIN: Describe the roles of Html, Javascript, and CSS in a web page.',
      '3 - PROFICIENT: Describe the roles of Html, Javascript, and CSS in a web page.',
    ],

    [
      '1 - NOT READY: Explain the difference between var, let, and const?',
      '2 - UNCERTAIN: Explain the difference between var, let, and const?',
      '3 - PROFICIENT: Explain the difference between var, let, and const?',
    ],
  ];

  // const [value, setValue] = React.useState(rubricItems[questionID][0]);
  // const handleChange = event => {
  //   setValue(event.target.value);
  // };

  return(
      <Formik
        initialValues={formData}
        onSubmit={values => {
          setFormData(values);
          direction === 'back' ? prevStep() : nextStep();
        }}
      >
        <Form className={classes.form}>
          <h1 className={classes.header}>{questions[questionID]}</h1>
          <div className={classes.questions}>
            <p>
              {questionContent[questionID].map(item => (
                <li>{item}</li>
              ))}
            </p>
          </div>
          <div className={classes.radio}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={rubricItems[questionID][0]}
              >
                <br />
                <FormControlLabel
                  value={`${questionType}_score`}
                  control={<Radio />}
                  label={rubricItems[questionID][0]}
                />
                <br />
                <FormControlLabel
                  value={`${questionType}_score`}
                  control={<Radio />}
                  label={rubricItems[questionID][1]}
                />
                <br />
                <FormControlLabel
                  value={`${rubricItems[questionID]}_score`}
                  control={<Radio />}
                  label={rubricItems[questionID][2]}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={classes.comments}>
            <h3>Enter comments below:</h3>
            <Field
              className={classes.TextField}
              name={`${questionType}_comment`}
              label="Comments"
              variant="outlined"
              id={questionType}
              multiline
              type="text"
              margin="dense"
              as={TextField}
            />
            <div className={classes.buttons}>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setDirection('back')}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setDirection('forward')}
              >
                Continue
              </Button>
              <br />
            </div>
          </div>
        </Form>
      </Formik>
  );
};

Question.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  questionID: PropTypes.number.isRequired,
  questionType: PropTypes.object.isRequired
};
