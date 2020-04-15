import React, { useState } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddFromExistingForm from 'components/AddFromExistingForm';
import PropTypes from 'prop-types';

import theme from 'utils/theme';
import styles from './styles';

const Setting = {
  SCRATCH: 0,
  TEMPLATE: 1,
};

function ActionItemCreationContainer({ classes, templates, selectCardFunc }) {
  const [creationSetting, setCreationSetting] = useState(Setting.SCRATCH);
  const renderButtonRow = () => {
    const isTemplateSetting = creationSetting === Setting.TEMPLATE;
    return (
      <Grid container item justify="space-evenly" spacing={1}>
        <Grid item>
          <Button
            variant={isTemplateSetting ? 'contained' : null}
            className={
              isTemplateSetting
                ? classes.selectedButton
                : classes.unselectedButton
            }
            onClick={() => setCreationSetting(Setting.TEMPLATE)}
          >
            SEE COMMON ASSIGNMENTS
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant={!isTemplateSetting ? 'contained' : null}
            className={
              !isTemplateSetting
                ? classes.selectedButton
                : classes.unselectedButton
            }
            onClick={() => setCreationSetting(Setting.SCRATCH)}
          >
            CREATE FROM SCRATCH
          </Button>
        </Grid>
      </Grid>
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        {renderButtonRow()}
        <Grid item>
          <AddFromExistingForm
            templates={templates}
            selectCardFunc={selectCardFunc}
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

ActionItemCreationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectCardFunc: PropTypes.func,
};

export default withStyles(styles)(ActionItemCreationContainer);
