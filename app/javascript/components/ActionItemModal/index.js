import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import MUIRichTextEditor from 'mui-rte';
import Fab from '@material-ui/core/Fab';
import theme from 'utils/theme';
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
import {
  withStyles,
  MuiThemeProvider,
  ThemeProvider,
} from '@material-ui/core/styles';
import { convertToRaw } from 'draft-js';
import { styles, richTextTheme } from './styles';
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
      errors: {
        title: '',
      },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  checkErrors = field => () => {
    const errorMessage = '';
    if (field === 'title') {
      const { title } = this.state;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        // eslint-disable-next-line
        let errorMessage = 'Title is required';
      }
    }
    this.setState(prevState => ({
      errors: { ...prevState.errors, [field]: errorMessage },
    }));
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleDescriptionChange = name => state => {
    const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
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
    console.log(classes);
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
            styles={styles.dialogStyle}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth
          >
            <DialogContent maxwidth="sm">
              <DialogContentText>Assign Category</DialogContentText>
              <Grid
                item
                xs
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item container direction="column" spacing={2}>
                  <Grid item>SEARCH BY CATEGORY</Grid>
                  <Grid item container direction="row" justify="space-evenly">
                    {categoryList.slice(0, 4)}
                  </Grid>
                  <Grid container item justify="center" spacing={2}>
                    {categoryList.slice(4)}
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogContent maxwidth="sm">
              <DialogContentText>Title</DialogContentText>
              <TextField
                value={this.state.title}
                style={styles.dialogContentTextFieldStyle}
                name="title"
                onChange={this.handleChange('title')}
                onBlur={this.checkErrors('title')}
                variant="outlined"
                margin="dense"
                id="title"
                label="Assignment title"
                type="text"
                fullWidth
                error={this.state.errors.title !== ''}
                helperText={this.state.errors.title}
              />
            </DialogContent>
            <br />
            <DialogContent maxwidth="sm">
              <DialogContentText style={styles.dialogContentTextStyle}>
                Description
              </DialogContentText>
              <MuiThemeProvider theme={richTextTheme}>
                <MUIRichTextEditor
                  name="description"
                  value={
                    this.state.type === 'create'
                      ? this.state.description.text
                      : this.state.description
                  }
                  onChange={this.handleDescriptionChange(description)}
                  variant="outlined"
                  label="Action Item description"
                  style={styles.MUIRichTextEditorStyle}
                  controls={[
                    'bold',
                    'italic',
                    'underline',
                    'numberList',
                    'bulletList',
                    'link',
                  ]}
                />
              </MuiThemeProvider>
            </DialogContent>
            <br />
            <DialogContent maxwidth="sm">
              <DialogContentText style={StyleSheet.dialogContentTextFieldStyle}>
                Due Date
              </DialogContentText>
              <TextField
                value={this.state.dueDate || ''}
                style={styles.dialogContentTextFieldStyle}
                name="Due Date"
                onChange={this.handleChange('dueDate')}
                onBlur={this.checkErrors('Due Date')}
                variant="outlined"
                margin="dense"
                id="Due Date"
                type="text"
                fullWidth
                error={this.state.errors.dueDate !== ''}
                helperText={this.state.errors.dueDate}
              />
            </DialogContent>
            <DialogActions styles={styles.dialogActionsStyle}>
              <Button
                onClick={this.handleClose}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={this.handleSubmit}
                variant="outlined"
                color="primary"
              >
                Add Assignment
              </Button>
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
  type: PropTypes.oneOf(['create', 'edit']),
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  category: PropTypes.string,
  addCard: PropTypes.func,
  classes: PropTypes.object,
};
ActionItemForm.defaultProps = {
  title: '',
  type: 'create',
  description: '',
  dueDate: '',
  category: '',
};
export default withStyles(styles)(ActionItemForm);
