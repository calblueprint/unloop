import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function RadioButtonsGroup({ rubricItems, questionType, score, radioHandler }) {
  const [value, setValue] = React.useState(`${questionType}_score${score}`);
  const rubricList = rubricItems;

  const handleChange = event => {
    radioHandler(event.target.value.slice(-1));
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Enter score based on rubric items:
      </FormLabel>
      <br />
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={`${questionType}_score${score}`}
        onChange={handleChange}
      >
        <FormControlLabel
          value={`${questionType}_score1`}
          control={<Radio />}
          label={rubricList[0]}
        />
        <br />
        <FormControlLabel
          value={`${questionType}_score2`}
          control={<Radio />}
          label={rubricList[1]}
        />
        <br />
        <FormControlLabel
          value={`${questionType}_score3`}
          control={<Radio />}
          label={rubricList[2]}
        />
      </RadioGroup>
    </FormControl>
  );
}

RadioButtonsGroup.propTypes = {
  rubricItems: PropTypes.array.isRequired,
  questionType: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  radioHandler: PropTypes.func.isRequired,
};

export default RadioButtonsGroup;
