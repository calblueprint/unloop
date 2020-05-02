import React, { useState } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddFromExistingForm from 'components/AddFromExistingForm';
import ActionItemForm from 'components/ActionItemForm';
import PropTypes from 'prop-types';

import theme from 'utils/theme';
import styles from './styles';

const Setting = {
  SCRATCH: 0,
  TEMPLATE: 1,
};

function ActionItemCreationContainer({
  classes,
  templates,
  selectedActionItems,
  title,
  setTitle,
  description,
  setDescription,
  categorySelected,
  setCategory,
  dueDate,
  setDueDate,
  selectActionItemTemplate,
  removeSelectedActionItem,
  createActionItem,
  deleteTemplate,
  setFile,
}) {
  const [creationSetting, setCreationSetting] = useState(Setting.SCRATCH);
  const [addToTemplates, setAddToTemplates] = useState(false);

  const renderButtonRow = () => {
    const isTemplateSetting = creationSetting === Setting.TEMPLATE;
    return (
      <Grid
        container
        item
        justify="space-evenly"
        className={classes.containerStyle}
      >
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
        className={classes.containerStyle}
      >
        {renderButtonRow()}
        <Grid item>
          {creationSetting === Setting.SCRATCH ? (
            <ActionItemForm
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              categorySelected={categorySelected}
              setCategory={setCategory}
              dueDate={dueDate}
              setDueDate={setDueDate}
              addToTemplates={addToTemplates}
              setAddToTemplates={setAddToTemplates}
              createActionItem={createActionItem}
              setFile ={setFile}
            />
          ) : (
            <AddFromExistingForm
              templates={templates}
              selectedActionItems={selectedActionItems}
              selectActionItemTemplate={selectActionItemTemplate}
              removeSelectedActionItem={removeSelectedActionItem}
              deleteTemplate={deleteTemplate}
            />
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

ActionItemCreationContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectedActionItems: PropTypes.instanceOf(Set).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  categorySelected: PropTypes.string,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  createActionItem: PropTypes.func.isRequired,
  selectActionItemTemplate: PropTypes.func.isRequired,
  removeSelectedActionItem: PropTypes.func.isRequired,
  setDueDate: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionItemCreationContainer);
