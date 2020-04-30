import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import theme from 'utils/theme';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from '@material-ui/core';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import styles from './styles';
class ActionItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      type: this.props.type,
      title: this.props.title,
      open: false,
      dueDate: this.props.dueDate,
      category: this.props.category,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({
      open: false,
      title: this.props.title,
    });
    if (this.state.type === 'edit') {
      this.state.title = this.props.title;
      this.state.description = this.props.description;
    }
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleCategoryChange = name => () => {
    this.setState({ category: name });
  };

  handleSubmit() {
    const { type } = this.state;
    let hasErrors = false;
    Object.keys(this.state.errors).forEach(field => {
      this.checkErrors(field)();
      hasErrors = hasErrors || this.state.errors[field] !== '';
    });
    if (!hasErrors) {
      if (type === 'create') {
        this.props.addCard(
          this.state.title,
          this.state.description,
          this.state.dueDate,
          this.state.category,
        );
      }
    }
  }

  button = () => {
    const ret = (
      <Button
        className="primary-button"
        variant="contained"
        color="secondary"
        onClick={this.handleOpen}
      >
        NEW ACTIONITEM +
      </Button>
    );
    return ret;
  };

  render() {
    const { classes } = this.props;
    const categories = [
      'Finances',
      'Project',
      'Community',
      'Startup',
      'Treatment',
      'Health',
      'Education',
    ];
    const categoryList = categories.map(category => (
      <Grid item direction="row" justify="flex-start" alignItems="center">
        <Fab
          className={classes.iconStyle}
          component="span"
          variant="extended"
          size="medium"
          aria-label="category"
        >
          <Typography
            className={classes.categoryButtonStyle}
            color="primary"
            align="center"
          >
            {category.toUpperCase()}
          </Typography>
        </Fab>
      </Grid>
    ));
    let description =
      this.state.type === 'create' ? 'description' : 'newDescription';
    if (this.state.type === 'create') {
      description = 'description';
    } else if (this.state.type === 'edit') {
      description = 'newDescription';
    }
    let dialog;
    if (this.state.type === 'create' || this.state.type === 'edit') {
      dialog = (
        <ThemeProvider theme={theme}>
          <Dialog
            classes={{ paper: classes.dialogPaperStyle }}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="action-item-modal"
          >
            <DialogContent className={classes.dialogContentStyle}>
              <Grid
                item
                container
                direction="column"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <DialogContentText className={classes.dialogContentTextStyle}>
                    Assign Category
                  </DialogContentText>
                </Grid>
                <Grid item container direction="row" justify="center">
                  {categoryList.slice(0, 4)}
                </Grid>
                <Grid container item justify="center">
                  {categoryList.slice(4)}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogContent className={classes.dialogContentStyle}>
              <DialogContentText className={classes.dialogContentTextStyle}>
                Title
              </DialogContentText>
              <TextField
                value={this.state.title}
                className={classes.dialogContentTextFieldStyle}
                name="title"
                onChange={this.handleChange('title')}
                variant="outlined"
                margin="dense"
                id="title"
                label="Assignment title"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogContent className={classes.dialogContentStyle}>
              <DialogContentText className={classes.dialogContentTextStyle}>
                Description
              </DialogContentText>
              <TextField
                value={this.state.description}
                className={classes.dialogContentTextFieldStyle}
                name="description"
                onChange={this.handleChange('description')}
                variant="outlined"
                margin="dense"
                id="description"
                label="Assignment description"
                type="text"
                fullWidth
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogContent className={classes.dialogContentStyle}>
              <DialogContentText className={classes.dialogContentTextStyle}>
                Due Date
              </DialogContentText>
              <TextField
                value={this.state.dueDate || ''}
                className={classes.dialogContentTextFieldStyle}
                name="Due Date"
                onChange={this.handleChange('dueDate')}
                variant="outlined"
                margin="dense"
                id="Due Date"
                type="date"
                fullWidth
              />
            </DialogContent>
            <DialogActions disableSpacing>
              <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Checkbox
                  color="primary"
                  className={classes.checkboxStyle}
                  // checked={addToTemplates}
                  // onChange={e => setAddToTemplates(e.target.checked)}
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
                    // if (allFieldsFilled) {
                    //   createActionItem(addToTemplates);
                    //   setFailedSubmit(false);
                    // } else {
                    //   setFailedSubmit(true);
                    // }
                  }}
                >
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
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      );
    }
    return (
      <>
        {this.button()}
        {dialog}
      </>
    );
  }
}
ActionItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['create', 'edit']),
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  category: PropTypes.string,
  addCard: PropTypes.func,
};
ActionItemForm.defaultProps = {
  title: '',
  type: 'create',
  description: '',
  dueDate: '',
  category: '',
};
export default withStyles(styles)(ActionItemForm);
