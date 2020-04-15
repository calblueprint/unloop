import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({ 
  rubricItems, questionType, studioAssessment 
}) {
  const [value, setValue] = React.useState(`${{ questionType }}1`);
  const rubricList = rubricItems;
  const handleChange = event => {
    setValue(event.target.value);
    const { id } = event.target;
      const { value } = event.target;
      this.setState(s => ({
        studioAssessment: {
          ...s.studioAssessment,
          [id]: value,
        },
    }));
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
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value={`${questionType}1`}
          control={<Radio />}
          label={rubricList[0]}
        />
        <br />
        <FormControlLabel
          value={`${questionType}2`}
          control={<Radio />}
          label={rubricList[1]}
        />
        <br />
        <FormControlLabel
          value={`${questionType}3`}
          control={<Radio />}
          label={rubricList[2]}
        />
      </RadioGroup>
    </FormControl>
  );
}
