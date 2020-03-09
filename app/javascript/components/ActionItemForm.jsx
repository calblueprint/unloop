import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import MUIRichTextEditor from 'mui-rte';
import { makeStyles } from '@material-ui/core/styles';
import { apiPost, apiPatch } from 'utils/axios';
import {
    Button, 
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    MenuItem,
    Switch, 
    Grid, 
    Paper
} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import { EditorState, convertToRaw } from 'draft-js';


const styles = {
    buttonStyle: {
      marginLeft: 'auto',
      marginRight: '0',
    },
    actionItemDescStyle: {
        marginLeft: '20px',
        paddingTop: '20px',
    },
    dialogActionsStyle: {
      padding: '30px',
    },
    dialogStyle: {
      padding: '20px',
    },
    dialogContentTextStyle: {
      color: 'black',
      marginBottom: '2px',
    },
    dialogContentTextFieldStyle: {
      marginTop: '2px',
      borderStyle: 'solid 4px grey',
    },
    MUIRichTextEditorStyle: {
      border: '5px solid',
      padding: '10px',
    },
    modalItems: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '750px',
      height: '100%',
      margin: 'auto',
      backgroundColor: 'white',
      padding: '50px'
    },
    actionItemDescriptionStyle: {
        height: '380px',
    overflow: 'auto',
    },
    backgroundColor: {
      backgroundColor: '#28303B',
      padding: '50px',
    },
    titleStyle: {
      color: 'white',
      fontSize: '36px',
      marginBottom: '0',
      marginTop: '0',
    },
  };
  

  const theme = createMuiTheme();
  Object.assign(theme, {
      overrides: {
          MUIRichTextEditor: {
              root: {
                borderLeft: 'solid 1px #C4C4C4',
                borderRight: 'solid 1px #C4C4C4',
                borderBottom: 'solid 1px #C4C4C4',
                borderRadius: '4px',
                overflow: 'auto',
              },
              editorContainer: {
                padding: '20px',
                overflow: 'auto',
                height: '130px',
              },
              toolbar: {
                backgroundColor: '#F4F4F4',
              },
        },
      },
  });

//   const textStyles = makeStyles(theme => ({ 
//     root: {
//       '& > *': {
//           margin: theme.spacing(1),
//           width: '25ch',
//       },
//     },
//   }));

  
//   const classes = textStyles();
//         return (
//             <form className={classes.root} noValidate autoComplete="off">
//                 <TextField id="standard-basic" label="Assignment Title" />
//             </form>
//     );



class ActionItemForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            participant_id: this.props.participant_id,
            internal: this.props.internal,
            type: this.props.type,
            id: this.props.id,
            title: this.props.title,
            default: false,
            completed: false,
            open: false,
            editorState: EditorState.createEmpty(),
            errors: {
              title: '',
            },
            display: this.props.display
        };
        this.onChange = editorState => this.setState({ editorState });
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleInternalChange = this.handleInternalChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    handleOpen() {
        this.setState({open: true});
    }
    handleClose() {
        this.setState({ 
        open: false,
        internal: this.props.internal,
        title: this.props.title
      });
    //handleInternalChange = 
    if(this.state.type == 'edit') {
      this.state.internal = this.props.internal,
      this.state.title = this.props.title,
      this.state.description = this.props.description
    }
  }
  checkErrors = field => () => {
    let errorMessage = '';
    if (field === 'title') {
      const { title } = this.state;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        errorMessage = 'Title is required';
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

  handleInternalChange = name => event => {
    this.setState(
      { [name]: event.target.checked }
    );
  };

  handleDescriptionChange = name => state => {
    const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    this.setState({ [name]: value });
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
        const body = {
          title: this.state.title,
          description: this.state.description,
          internal: this.state.internal,
          participant_id: this.state.participant_id,
        };
        
        apiPost('/api/case_notes', { case_note: body })
          .then(() => window.location.reload())
          .catch(error => console.error(error));
      } else {
        
        const newTitle = this.state.title;
        const newDescription = this.state.tempDescription;
        const newInternal = this.state.internal;

        this.setState({
          title: newTitle,
          description: newDescription,
          internal: newInternal,
        });
  
      const body = {
        title: this.state.title,
        description: this.state.description,
        internal: this.state.internal,
        participant_id: this.state.participant_id
      };
      apiPatch(`/api/case_note/${this.state.id}/`, {case_note: body}).then(() => window.location.reload())
      .catch(error => console.error(error));
    }
  }
}
button = () => {
  let ret;
  if (this.state.display == 'plus') {
    ret = (
      <button onClick={this.handleOpen} className="plus-button">
        +
      </button>
    );
  } else if (this.state.type === 'create') {
    ret = (
      <Button
        className="primary-button"
        variant="contained"
        color="secondary"
        onClick={this.handleOpen}
      >
        NEW ACTIONITEM +
      </Button>
    );
  } else if (this.state.type === 'edit') {
    ret = <MenuItem onClick={this.handleOpen}>Edit</MenuItem>;
  } 
  return ret;
};



    render(){
      let description;
      if(this.state.type = 'create') {
        description = 'description';
      }
      else if (this.state.type == 'edit') {
        description = 'newDescription'
      }
      let dialog;
      if(this.state.type == 'create' || this.state.type == 'edit') {
        dialog = (
          <Dialog styles = {styles.dialogStyle}
          open = {this.state.open}
          onClose = {this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth
          >
          <DialogContent maxwidth="sm">
          <DialogContentText>
            Title
          </DialogContentText>
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
            <MuiThemeProvider theme={theme}>
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
          <br/>
          <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Visible to Participant
              <Switch
                name="internal"
                checked={this.state.internal}
                onChange={this.handleInternalChange('internal')}
                value="internal"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </DialogContentText>
          </DialogContent>

  
            <DialogActions styles = {styles.dialogActionsStyle}>
              <Button 
                onClick = {this.handleClose}
                variant = "outlined"
                color = "secondary"
                >
                  Cancel
                </Button>
                <Button
                onClick={this.handleSubmit}
                variant="outlined"
                color="primary">

                {this.state.type === 'create'
                ? 'Submit Case Note'
                : 'Edit Casenote'}
              </Button>
            </DialogActions>
          </Dialog>
        );
      }
        return(
          <>
          {this.button()}
          {dialog}
          </>
    );
  }
}
 ActionItemForm.propTypes= {
   type: PropTypes.oneOf(['create', 'edit']),
   title: PropTypes.string,
   description: PropTypes.string,
   internal: PropTypes.bool,
   open: PropTypes.bool,
 };





 ActionItemForm.defaultProps = {
     title: '',
     default: false,
     completed: false,
     open: false,
     itnernal: true,
     type: 'create',
     description: '',
   };
  



export default ActionItemForm;