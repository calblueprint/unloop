import React from 'react';
import PropTypes from 'prop-types';
import MUIRichTextEditor from 'mui-rte';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import { Button, Dialog, Grid, Paper } from '@material-ui/core/';
import { createMuiTheme } from '@material-ui/core/styles';

const styles = {
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: '0',
  },
  casenoteDescStyle: {
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
  modalItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '750px',
    height: '100%',
    margin: 'auto',
    backgroundColor: '#28303B',
  },
  backgroundColor: {
    backgroundColor: '#28303B',
    padding: '50px',
  },
  casenoteCardModalDescriptionStyle: {
    height: '380px',
    overflow: 'auto',
  },
  titleStyle: {
    color: 'white',
    fontSize: '36px',
    marginBottom: '0',
    marginTop: '0',
  },
};

// TODO: Move to global theme
const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
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

class CaseNoteCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <>
        <div style={this.buttonStyle}>
          <Button
            className="contained"
            color="primary"
            onClick={this.handleOpen}
          >
            VIEW MORE
          </Button>
        </div>

        <Dialog
          style={styles.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="md"
        >
          <div style={styles.backgroundColor}>
            <div style={styles.modalItems}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h3 style={styles.titleStyle}>{this.state.title}</h3>
                </Grid>

                <Grid item xs={12}>
                  <Paper style={styles.casenoteCardModalDescriptionStyle}>
                    <div style={styles.casenoteDescStyle}>
                      <MUIRichTextEditor
                        value={this.state.description}
                        readOnly
                        toolbar={false}
                      />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

CaseNoteCardModal.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

export default CaseNoteCardModal;
