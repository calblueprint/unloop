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
      title: this.props.type === 'create' ? '' : this.props.title,
      description: this.props.type === 'create' ? '' : this.props.description,
      categorySelected:
        this.props.type === 'create' ? '' : this.props.categorySelected,
      dueDate: this.props.type === 'create' ? '' : this.props.dueDate,
      addToTemplates: false,
      failedSubmit: false,
    };
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { participantId, actionItemId } = this.props;
    const {
      title,
      description,
      categorySelected,
      dueDate,
      addToTemplates,
    } = this.state;

    if (title && description && categorySelected) {
      this.props.handleSubmit(
        title,
        description,
        categorySelected,
        dueDate,
        addToTemplates,
        participantId,
        actionItemId,
      );
      this.props.handleClose();
    } else {
      this.setState({ failedSubmit: true });
    }
  };

  render() {
    const { classes, open } = this.props;
    const {
      failedSubmit,
      title,
      description,
      categorySelected,
      addToTemplates,
    } = this.state;

    const categories = [
      'Finances',
      'Project',
      'Community',
      'Startup',
      'Treatment',
      'Health',
      'Education',
    ];
    const categoryList = categories.map(category => {
      const isSelectedCategory =
        categorySelected && categorySelected === category;
      return (
        <Grid item key={category}>
          <Fab
            className={classes.iconStyle}
            style={{
              backgroundColor: isSelectedCategory
                ? theme.palette.primary.main
                : theme.palette.common.lighterBlue,
            }}
            onClick={() => {
              const newCategoryValue =
                categorySelected !== category
                  ? { target: { value: category } }
                  : { target: { value: null } };
              this.handleChange('categorySelected')(newCategoryValue);
            }}
            component="span"
            variant="extended"
            size="medium"
            aria-label="category"
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
        <Dialog
          classes={{ paper: classes.dialogPaperStyle }}
          open={open}
          onClose={this.props.handleClose}
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
                <DialogContentText
                  className={classes.dialogContentTextStyle}
                  style={{
                    color: failedSubmit && !categorySelected ? 'red' : 'black',
                  }}
                >
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
            <DialogContentText
              className={classes.dialogContentTextStyle}
              style={{ color: failedSubmit && !title ? 'red' : 'black' }}
            >
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
            <DialogContentText
              className={classes.dialogContentTextStyle}
              style={{ color: failedSubmit && !description ? 'red' : 'black' }}
            >
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
                  checked={addToTemplates}
                  onChange={e => {
                    const newValue = { target: { value: e.target.checked } };
                    this.handleChange('addToTemplates')(newValue);
                  }}
                />
                <Typography
                  display="inline"
                  className={classes.checkboxTextStyle}
                >
                  ADD TO COMMON ASSIGNMENTS
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={this.handleSubmit}>
                  <Typography
                    display="inline"
                    size="small"
                    className={classes.checkboxTextStyle}
                  >
                    {this.props.type === 'CREATE'
                      ? 'CREATE ACTION ITEM'
                      : 'EDIT ACTION ITEM'}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    );
  }
}
ActionItemForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['create', 'edit']),
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  categorySelected: PropTypes.string,
  open: PropTypes.bool.isRequired,
  participantId: PropTypes.number,
  actionItemId: PropTypes.number,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
ActionItemForm.defaultProps = {
  title: '',
  type: 'create',
  description: '',
  dueDate: '',
  categorySelected: '',
};
export default withStyles(styles)(ActionItemForm);
