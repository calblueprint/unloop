import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Question from 'components/StudioAssessmentQuestion';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Big Picture',
    'Fundamentals',
    'Version Control',
    'React',
    'Node',
    'Database',
    'Problem Solving',
  ];
}

export const StudioAssessmentForm = ({
  studioAssessment,
  participantId,
  userType,
  onClose,
  type,
}) => {
  const questionType = [
    'bigpicture',
    'progfundamentals',
    'versioncontrol',
    'react',
    'node',
    'db',
    'problemsolving',
  ];
  const [step, setStep] = useState(1);
  const classes = useStyles();
  const steps = getSteps();

  const [formData, setFormData] = useState({
    score: 'hi',
    comments: '',
  });
  const nextStep = () => {
    setStep(prev => prev + 1);
  };
  const prevStep = () => setStep(prev => prev - 1);
  return (
    <div>
      <div className={classes.root}>
        <Stepper activeStep={step - 1} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <Question
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        prevStep={prevStep}
        questionType={questionType[step - 1]}
        questionID={step - 1}
        studioAssessment={studioAssessment}
        participantId={participantId}
        userType={userType}
        onClose={onClose}
        type={type}
      />
    </div>
  );
};

StudioAssessmentForm.propTypes = {
  studioAssessment: PropTypes.object.isRequired,
  participantId: PropTypes.number.isRequired,
  userType: PropTypes.oneOf(['staff', 'participant']).isRequired,
  onClose: PropTypes.func,
  type: PropTypes.string,
};
