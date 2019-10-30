import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { convertToRaw } from 'draft-js';
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte';
import axios from 'axios';

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

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
  overrides: {
      MUIRichTextEditor: {
          root: {
          },
          editorContainer: {
              border: "1px solid gray" 
          }
      }
  }
})

class NewCasenote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      description: "",
      title: "",
      participant: "",
      internal: false,
      open: false,
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInternalChange = this.handleInternalChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({open: true });
  }
  
  handleClose() {
    this.setState({open: false });
  }

  handleChange = name => (event) => {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  handleInternalChange = name => (event) => {
    this.setState({ [name]: !this.state.internal });
  }

  handleDescriptionChange = name => (state) => {
    // TODO: the line below is the rtf representation. Update to this once rtf on /casenotes
    // const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    const value = state.getCurrentContent().getPlainText();
    this.setState({ [name]: value });
  }

  handleSubmit() {
    alert('A name was submitted: ' + this.state.title + this.state.description + this.state.internal);
    let body = {
      "title": this.state.title,
      "description": this.state.description,
      "internal": this.state.internal,
      "participant_id": 1,
    };
    body = JSON.stringify({casenote: body});
    let req = '/api/casenotes/';
    fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {console.log(data)}).catch((data) => { console.error(data) });
    this.handleClose();
  }

  render () {
    return (
      <React.Fragment>
         <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Open form dialog
        </Button>

        <Dialog style={styles.dialogStyle} open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>

          <DialogContent maxwidth="sm" fullwidth>
            <TextField style={styles.dialogContentTextFieldStyle}
              name="title"
              value={this.state.title}
              onChange={this.handleChange("title")}
              variant="outlined"
              margin="dense"
              id="title"
              label="Insert Casenote Title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br/>

          <DialogContent maxwidth="sm" fullwidth>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Casenote Description
            </DialogContentText>
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                name="description"
                value={this.state.description.text}
                onChange={this.handleDescriptionChange("description")}
                variant="outlined"
                margin="dense"
              />
            </MuiThemeProvider>
            
          </DialogContent>
          <br/>

          {/* <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Participant
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              name="participant"
              value={this.state.participant}
              variant="outlined"
              select
              margin="dense"
              id="title"
              label="Select Participant"
              type="text"
              fullWidth
            />
          </DialogContent> */}

          <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              visible to participant
              <Switch 
                name="internal"
                defaultChecked={this.state.internal}
                onChange={this.handleInternalChange("internal")}
                value={this.state.internal}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </DialogContentText>
            
          </DialogContent>

          <DialogActions style={styles.dialogActionsStyle}>
            <Button onClick={this.handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="outlined" color="primary">
              Submit Casenote
            </Button>
          </DialogActions>
        </Dialog>

      </React.Fragment>
      
    );
  }
}

//ReactDOM.render(editor, document.querySelector("[data-mount]"));

export default NewCasenote;
