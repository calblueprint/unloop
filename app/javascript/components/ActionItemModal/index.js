import React from 'react';
import PropTypes from 'prop-types';
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
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import ActionItemCategoryTag from 'components/ActionItemCategoryTag';
import styles from './styles';
class ActionItemModal extends React.Component {
  constructor(props) {
    super(props);
    const isCreate = this.props.type === 'create';
    this.state = {
      title: isCreate ? '' : this.props.title,
      description: isCreate ? '' : this.props.description,
      categorySelected: isCreate ? '' : this.props.categorySelected,
      dueDate: isCreate ? '' : this.props.dueDate,
      file: isCreate ? '' : this.props.file,
      fileURL: isCreate ? '' : this.props.fileURL,
      failedSubmit: false,
    };
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = event => {
    const file = event.target.files[0] ? event.target.files[0] : null;
    const fileURL = file ? window.URL.createObjectURL(file) : null;
    this.setState({ file, fileURL });
  };

  handleSubmit = () => {
    const { participantId, actionItemId, actionItem } = this.props;
    const {
      title,
      description,
      categorySelected,
      dueDate,
      file,
      fileURL,
    } = this.state;
    if (this.state.newFile) {
      this.updateFile();
    }
    if (title && description && categorySelected) {
      this.props.handleSubmit({
        title,
        description,
        categorySelected,
        dueDate,
        participantId,
        actionItemId,
        actionItem,
        file,
        fileURL,
      });
      this.props.handleClose();
    } else {
      this.setState({ failedSubmit: true });
    }
  };

  handleCategoryChange = category => {
    // handleChange expects this form
    const newCategory =
      this.state.categorySelected !== category ? category : null;
    this.handleChange('categorySelected')({ target: { value: newCategory } });
  };

  render() {
    const { classes, open, categories } = this.props;
    const {
      failedSubmit,
      title,
      description,
      categorySelected,
      fileURL,
    } = this.state;

    const categoryList = categories.map(category => {
      const isSelectedCategory =
        categorySelected && categorySelected === category;
      return (
        <Grid item key={category}>
          <ActionItemCategoryTag
            category={category}
            selected={isSelectedCategory}
            handleClick={this.handleCategoryChange}
          />
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
              <Grid
                item
                style={{
                  color: failedSubmit && !categorySelected ? 'red' : 'black',
                }}
              >
                Choose Category
              </Grid>
              <Grid item container justify="center" spacing={4}>
                {categoryList.slice(0, 4)}
              </Grid>
              <Grid container item justify="center" spacing={4}>
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
              value={this.state.dueDate ? this.state.dueDate.split('T')[0] : ''} // Formatting the date correctly (remove timestamp)
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
              <Grid
                item
                container
                direction="column"
                xs={6}
                justify="space-between"
              >
                {/* Style needed to align button and input tag */}
                <Grid item style={{ position: 'relative', right: '10px' }}>
                  <Button
                    onClick={() => window.open(fileURL, '_blank')}
                    disabled={!fileURL}
                  >
                    <Typography
                      display="inline"
                      size="small"
                      className={classes.checkboxTextStyle}
                    >
                      {fileURL ? 'View File' : 'No File Uploaded'}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <input type="file" onChange={e => this.handleFileChange(e)} />
                </Grid>
              </Grid>
              <Grid item>
                <Button onClick={this.handleSubmit}>
                  <Typography
                    display="inline"
                    size="small"
                    className={classes.checkboxTextStyle}
                  >
                    {this.props.type === 'create'
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
ActionItemModal.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['create', 'edit']),
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  categorySelected: PropTypes.string,
  categories: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  participantId: PropTypes.number,
  actionItemId: PropTypes.number,
  actionItem: PropTypes.object,
  file: PropTypes.object,
  fileURL: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

ActionItemModal.defaultProps = {
  title: '',
  type: 'create',
  description: '',
  dueDate: '',
  categorySelected: '',
};
export default withStyles(styles)(ActionItemModal);
