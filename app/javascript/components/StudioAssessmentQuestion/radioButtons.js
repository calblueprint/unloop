import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioButtonsGroup({ 
  rubricItems, questionType, score, radioHandler
}) {
  const [value, setValue] = React.useState(
    score === null ?
    `${questionType}_score${score}` 
    :
    `${questionType}_score1`
  );
  const rubricList = rubricItems;
  const handleChange = event => {
    console.log("radio")
    console.log(event.target.value)
    setValue(event.target.value);
    radioHandler(event.target.value.slice(-1))
    console.log(value.slice(-1))
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
