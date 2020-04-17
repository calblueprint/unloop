import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import theme from 'utils/theme';
import styles from './styles';

const categories = [
  'FINANCES',
  'PROJECT',
  'COMMUNITY',
  'STARTUP',
  'TREATMENT',
  'HEALTH',
  'EDUCATION',
];

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
}) {
  const categoryList = categories.map(category => {
    const isSelectedCategory =
      categorySelected && categorySelected === category;
    return (
      <Grid item>
        <Fab
          className={classes.iconStyle}
          style={{
            backgroundColor: isSelectedCategory
              ? theme.palette.primary.main
              : theme.palette.common.lighterBlue,
          }}
          component="span"
          variant="extended"
          size="small"
          aria-label="category"
          onClick={() =>
            setCategory(
              categorySelected !== category
                ? { target: { value: category } }
                : { target: { value: null } },
            )
          }
        >
          <Typography
            className={classes.categoryButtonStyle}
            style={{
              color: isSelectedCategory
                ? theme.palette.common.lighterBlue
                : theme.palette.primary.main,
            }}
            align="center"
          >
            {category.toUpperCase()}
          </Typography>
        </Fab>
      </Grid>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3} className={classes.formStyle}>
        <Grid container spacing={1} direction="column">
          <Grid item container direction="column" spacing={1}>
            <Grid item>SEARCH BY CATEGORY</Grid>
            <Grid item container direction="row" justify="space-evenly">
              {categoryList.slice(0, 4)}
            </Grid>
            <Grid container item justify="center" spacing={2}>
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
              <div>Assignment Title</div>
              <TextField
                className={classes.searchBar}
                onChange={e => setTitle(e)}
                value={title}
                variant="outlined"
                type="text"
                margin="dense"
              />
            </Grid>
            <Grid item>
              <div>Assignment Description</div>
              <TextField
                variant="outlined"
                className={classes.searchBar}
                onChange={e => setDescription(e)}
                multiline
                type="text"
                margin="dense"
                value={description}
                rows={2}
              />
            </Grid>
            <Grid item>
              <div>Due Date</div>
              <TextField
                type="date"
                value={dueDate}
                className={classes.searchBar}
                onChange={e => setDueDate(e)}
              />
            </Grid>
            <Grid item container justify="space-between">
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
                <Button onClick={() => createActionItem(addToTemplates)}>
                  <Typography
                    display="inline"
                    size="small"
                    className={classes.checkboxTextStyle}
                  >
                    ADD ACTION ITEM
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
};

export default withStyles(styles)(ActionItemForm);
