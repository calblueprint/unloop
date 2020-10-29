import React, { useState, useRef } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import ActionItemCategoryTag from 'components/ActionItemCategoryTag';
import theme from 'utils/theme';
import styles from './styles';

function ActionItemForm({
  classes,
  title,
  setTitle,
  description,
  setDescription,
  categorySelected,
  setCategory,
  dueDate,
  setDueDate,
  addToTemplates,
  setAddToTemplates,
  createActionItem,
  setFile,
  categories,
}) {
  const [failedSubmit, setFailedSubmit] = useState(false);
  const inputRef = useRef(null);

  const handleCategoryChange = category => {
    // setCategory uses ActionItemCreationPage's handleChange which expects this form
    const newCategory = categorySelected !== category ? category : null;
    setCategory({ target: { value: newCategory } });
  };

  const categoryList = categories.map(category => {
    const isSelectedCategory =
      categorySelected && categorySelected === category;
    return (
      <Grid item key={category}>
        <ActionItemCategoryTag
          category={category}
          selected={isSelectedCategory}
          handleClick={handleCategoryChange}
        />
      </Grid>
    );
  });

  const allFieldsFilled = title && description && categorySelected;

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} className={classes.formStyle}>
        <Grid container spacing={1} direction="column">
          <Grid item container direction="column" justify="center" spacing={1}>
            <Grid
              item
              style={{
                color: failedSubmit && !categorySelected ? 'red' : 'black',
              }}
            >
              <Typography variant="body1">Choose Category</Typography>
            </Grid>
            <Grid item container justify="center" spacing={1}>
              {categoryList.slice(0, 4)}
            </Grid>
            <Grid container item justify="center" spacing={1}>
              {categoryList.slice(4)}
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item>
              <div style={{ color: failedSubmit && !title ? 'red' : 'black' }}>
                <Typography variant="body1">Assignment Title</Typography>
              </div>
              <TextField
                className={classes.searchBar}
                onChange={e => setTitle(e)}
                value={title}
                variant="outlined"
                type="text"
                margin="dense"
                required
                error={failedSubmit && !title}
              />
            </Grid>
            <Grid item>
              <div
                style={{
                  color: failedSubmit && !description ? 'red' : 'black',
                }}
              >
                <Typography variant="body1">Assignment Description</Typography>
              </div>
              <TextField
                variant="outlined"
                className={classes.searchBar}
                onChange={e => setDescription(e)}
                multiline
                type="text"
                margin="dense"
                value={description}
                required
                error={failedSubmit && !description}
                rows={2}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">Due Date (Optional)</Typography>
              <TextField
                type="date"
                value={dueDate}
                className={classes.searchBar}
                onChange={e => setDueDate(e)}
              />
            </Grid>
            <Grid item container justify="space-between">
              <Grid item>
                <input type="file" ref={inputRef} onChange={e => setFile(e)} />
              </Grid>
              <Grid item>
                <Checkbox
                  color="primary"
                  className={classes.checkboxStyle}
                  checked={addToTemplates}
                  onChange={e => setAddToTemplates(e.target.checked)}
                />
                <Typography
                  display="inline"
                  className={classes.checkboxTextStyle}
                >
                  ADD TO COMMON ASSIGNMENTS
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    if (allFieldsFilled) {
                      createActionItem(addToTemplates);
                      setAddToTemplates(false);
                      setFailedSubmit(false);
                      // Needed to clear file input after successful creation
                      inputRef.current.value = '';
                    } else {
                      setFailedSubmit(true);
                    }
                  }}
                >
                  <Typography
                    display="inline"
                    size="small"
                    className={classes.checkboxTextStyle}
                  >
                    ADD ASSIGNMENT
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

ActionItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  categorySelected: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
  dueDate: PropTypes.string.isRequired,
  setDueDate: PropTypes.func.isRequired,
  addToTemplates: PropTypes.bool.isRequired,
  setAddToTemplates: PropTypes.func.isRequired,
  createActionItem: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionItemForm);
