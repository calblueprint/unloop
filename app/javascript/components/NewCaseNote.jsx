import React from "react";
import { convertToRaw } from 'draft-js';
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import { Button, TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Switch } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte';

const styles = {
  dialogActionsStyle: {
    padding: '30px',
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
    padding: '10px'
  },
  dialogStyle: {
    padding: '20px'
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey'
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey'
  }
}

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: 'solid 1px #C4C4C4',
        borderRadius: '4px'
      },
      editor: {
        padding: '20px',
      },
    }
  }
});


class NewCaseNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      description: "",
      title: "",
      participant_id: this.props.participant_id,
      internal: true,
      open: false,
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInternalChange = this.handleInternalChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleOpen() {
    this.setState({open: true });
  }
  
  handleClose() {
    this.setState({open: false });
  }
  
  handleChange = name => (event) => {
    const { value } = event.target;
    this.setState({ [name]: value });
  }

  handleInternalChange = name => (event) => {
    this.setState({ [name]: !this.state.internal });
  };
  
  handleDescriptionChange = name => (state) => {
    // TODO: the line below is the rtf representation. Update to this once rtf on /casenotes
    // const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    const value = state.getCurrentContent().getPlainText();
    this.setState({ [name]: value });
  }

  handleSubmit() {
    let body = {
      "title": this.state.title,
      "description": this.state.description,
      "internal": this.state.internal,
      "participant_id": this.state.participant_id,
    };
    body = JSON.stringify({case_note: body});
    let req = '/api/case_notes/';
    fetch(req, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      },
      body: body,
      credentials: 'same-origin',
    }).then((data) => {window.location.reload()}).catch((data) => { console.error(data) });
  }
  
  render () {
    return (
      <React.Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Create New Case Note
        </Button>
        
        <Dialog 
          style={styles.dialogStyle}
          open={this.state.open} 
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <DialogContent maxwidth="sm">
            <DialogContentText style={styles.dialogContentTextStyle}>
              Title
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              name="title"
              value={this.state.title}
              onChange={this.handleChange("title")}
              variant="outlined"
              margin="dense"
              id="title"
              label="Case Note title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br/>
          
          <DialogContent maxwidth="sm">
            <DialogContentText style={styles.dialogContentTextStyle}>
              Description
            </DialogContentText>
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                name="description"
                value={this.state.description.text}
                onChange={this.handleDescriptionChange("description")}
                variant="outlined"
                label="Case Note description"
                style={styles.MUIRichTextEditorStyle}
              />
            </MuiThemeProvider>
            </DialogContent>
          <br/>
          
          {/* <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Participant
            </DialogContentText>
            <TextField style={styles.dialogContentTextFieldStyle}
              name="participant"
              value={this.state.participant}
              variant="outlined"
              select
              margin="dense"
              id="title"
              label="Select Participant"
              type="text"
              fullWidth
            />
          </DialogContent> */}
          
          <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Visible to Participant
              <Switch
                name="internal"
                defaultChecked={false}
                onChange={this.handleInternalChange("internal")}
                value={this.state.internal}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </DialogContentText>
          </DialogContent>
          
          <DialogActions style={styles.dialogActionsStyle}>
            <Button onClick={this.handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="outlined" color="primary">
              Submit Case Note
            </Button>
          </DialogActions>
        </Dialog>
        
      </React.Fragment>
    );
  }
}

//ReactDOM.render(editor, document.querySelector("[data-mount]"));

export default NewCaseNote;

