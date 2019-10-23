import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  dialogActionsStyle: {
    padding: '30px',
  },
  dialogTitleStyle: {
    borderBottom: '5px solid',
    borderImageSource: 'linear-gradient(to left, transparent 20%, #C4C4C4 20%)',
    borderImageSlice: '1',
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey'
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey'
  }
}

class PaperworkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_email: "",
      participant_name: "",
      staff_email: "",
      staff_name: "",
      google_drive_link: "",
      due_date: null,
      open: false,
    };
    this.handleClose = this._handleClose.bind(this);
    this.handleOpen = this._handleOpen.bind(this);
  }

  _handleOpen() {
    this.setState({open: true });
  }

  _handleClose() {
    this.setState({open: false });
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Open form dialog
        </Button>
        <Dialog style={styles.dialogStyle} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
          <DialogTitle id="form-dialog-title">
            <h2 style={styles.dialogTitleStyle}> Assign new paperwork </h2>
        </DialogTitle>
        <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Assign Document Title
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              variant="outlined"
              margin="dense"
              id="title"
              label="Insert Title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br/>
          <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Insert Link to Document
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              variant="outlined"
              margin="dense"
              id="paperwork-link"
              label="Google Drive Link"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br/>
          <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Assign Due Date
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              variant="outlined"
              margin="dense"
              id="due-date"
              label="MM/DD/YYYY"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions style={styles.dialogActionsStyle}>
            <Button onClick={this.handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} variant="outlined" color="primary">
              Save Document
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

  }
}
