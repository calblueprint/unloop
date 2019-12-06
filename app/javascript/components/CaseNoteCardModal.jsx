import React from 'react';
import MUIRichTextEditor from 'mui-rte';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, Grid, Paper } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const styles = {
    dialogActionsStyle: {
        padding: '30px',
    },
    MUIRichTextEditorStyle: {
        border: '5px solid',
        padding: '10px',
    },
    dialogStyle: {
        padding: '20px',
        backgroudnColor: '#28303B',
    },
    dialogContentTextStyle: {
        color: 'black',
        marginBottom: '2px',
    },
    dialogContentTextFieldStyle: {
        marginTop: '2px',
        borderStyle: 'solid 4px grey',
    },
    saveDocumentButtonStyle: {
        borderStyle: 'solid 3px grey',
    },
};

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
        root: {
            borderLeft: 'solid 1px #C4C4C4',
            borderRight: 'solid 1px #C4C4C4',
            borderBottom: 'solid 1px #C4C4C4',
            borderRadius: '4px',
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
            internal: this.props.internal,
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
            <div>
                <Button
                    className="primary-button"
                    variant="contained"
                    color="primary"
                    onClick={this.handleOpen}
                    >
                    VIEW
                </Button>

                <Dialog
                    fullScreen
                    style={styles.dialogStyle}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={9}>
                            <h3>{this.state.title}</h3>
                        </Grid>
                        
                        <Grid item xs={9}>
                            <Paper style={styles.casenoteCardStyle}>
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
                </Dialog>

            </div>
        );
    }
}

export default CaseNoteCardModal;
