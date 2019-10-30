import React from "react";
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/paperworks.scss';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';


class PaperworkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_id: 1,
      staff_id: 0,
      link: "",
      paperwork_title: "",
      due_date: null,
      open: false,
    };
    this.handleClose = this._handleClose.bind(this);
    this.handleOpen = this._handleOpen.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    const { staff_id } = this.props;
    this.setState({staff_id: staff_id});
  }

  _handleOpen() {
    this.setState({open: true});
  }

  _handleClose() {
    this.setState({open: false});
  }

  _handleSubmit() {
    let body = {
                "link": this.state.link,
                "title": this.state.title,
                "staff_id": this.state.staff_id,
                "participant_id": this.state.participant_id,
                "agree": false,
              };
    body = JSON.stringify({paperwork: body});
    let request = `/api/paperworks/`;
    fetch(request, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {window.location.reload()}).catch((data) => {console.error(data)});
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Create New Paperwork
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
          <DialogTitle>
            <h2 className="dialogTitle"> Assign new paperwork </h2>
          </DialogTitle>
          <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText className="dialogContentText">
              Assign Document Title
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={(e) => this.setState({title: e.target.value})}
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
            <DialogContentText className="dialogContentText">
              Insert Link to Document
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={(e) => this.setState({link: e.target.value})}
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
            <DialogContentText className="dialogContentText">
              Assign Due Date
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={(e) => this.setState({due_date: e.target.value})}
              variant="outlined"
              margin="dense"
              id="due-date"
              type="date"
              fullWidth
            />
          </DialogContent>
          <DialogActions className="dialogActions">
            <Button onClick={this.handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="outlined" color="primary">
              Save Document
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PaperworkForm;
