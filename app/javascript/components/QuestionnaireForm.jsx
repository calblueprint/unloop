import React from "react";
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/personal_questionnaires.scss';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextareaAutosize } from '@material-ui/core/';
import PropTypes from 'prop-types';


class QuestionnaireForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_id: 1,
      staff_id: 0,
      open: true,
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
    let fields = this.props.fields
    let body =  {}
    fields.map((f) => {
      body[f] = this.state[f]
    })
    body = JSON.stringify({personal_questionnaire: body});
    let request = "/api/" + this.props.questionnaireType.toLowerCase() + "_questionnaires/";
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

  createTextForm(fieldName, contentText) {
    // content text is prompt/title for the text box
    // field name is the name of the field that will be filled in the database
    return (<DialogContent maxWidth="sm" fullWidth>
            <DialogContentText className="dialogContentText">
              {contentText}
            </DialogContentText>
            <TextareaAutosize
              className="dialogContentTextField"
              onChange={(e) => this.setState({[fieldName]: e.target.value})}
              variant="outlined"
              margin="dense"
              id={fieldName}
              // label="Insert Title"
              type="text"
              fullWidth
              rowsMax={100}
            />
          </DialogContent>)
  }


  createTextForms() { 
    let fields = this.props.fields.filter((f) => {
      return f !== "id" && f !== "created_at" && f !== "updated_at" && f !== "participant_id" 
    })

    fields = fields.map((f) => {
      f = f.charAt(0).toUpperCase() + f.substring(1);
      return f.replace(/([-_][a-z])/ig, ($1) => {
        return $1.toUpperCase()
          .replace('-', ' ')
          .replace('_', ' ');
      });
    });
    
    let form = fields.map((f) => {
      return this.createTextForm(f, f)
    })
    return (<div>{form}</div>)
  }

  render() {
    const qType = this.props.questionnaireType
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Create New {qType} Questionnaire
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
          <DialogTitle>
            <h2 className="dialogTitle"> Intake Form -- {qType} </h2>
          </DialogTitle>
          {this.createTextForms()}
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

QuestionnaireForm.propTypes = {
  fields: PropTypes.array,
}

export default QuestionnaireForm;
