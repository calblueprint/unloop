import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { convertToRaw } from 'draft-js';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';
import {TextField, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Switch } from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MUIRichTextEditor from 'mui-rte';
import CaseNoteForm from 'components/CaseNoteForm'; 

const classes = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const styles = {
    casenoteCardStyle: {
        marginLeft: '20px',
        padding: '5px',
        paddingRight: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        borderRadius: '10px',
        height: '200px',
    },
    casenoteTextStyle: {
        marginLeft: '15px',
    },
    casenoteDescStyle: {
        overflow: 'auto',
        height: '100px',
        marginTop: '-10px'
    },
    dialogActionsStyle: {
        padding: '30px',
    },
    MUIRichTextEditorStyle: {
        border: '5px solid',
        padding: '10px',
    },
    dialogStyle: {
        padding: '20px',
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

const defaultTheme = createMuiTheme();


class SimpleMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            title: this.props.title,
            description: this.props.description,
            internal: this.props.internal,
            id: this.props.id,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    render () {
        return(
            <div>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                        maxHeight: 40 * 4.5,
                        width: 200,
                        },
                    }}
                >
                    <CaseNoteForm 
                    type="edit"
                    title={this.state.title}
                    description={this.state.description}
                    internal={this.state.internal}
                    participantId={this.state.participant_id}
                    id={this.state.id} />
                    <CaseNoteForm 
                    type="delete"
                    title={this.state.title}
                    description={this.state.description}
                    internal={this.state.internal}
                    participantId={this.state.participant_id}
                    id={this.state.id} />
                </Menu>
            </div>
        );
    }
}

class CaseNoteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            title: this.props.title,
            internal: this.props.internal,
            id: this.props.id,
        };
    }

    componentDidMount() {
        
    }

    render () {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={11}>
                        <Paper className={classes.paper} style={styles.casenoteCardStyle}>
                            <div style={styles.casenoteTextStyle}>
                                <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <h3>{this.state.title}</h3>
                                </Grid>
                                <Grid item xs={2}>
                                    <SimpleMenu 
                                    title={this.state.title} 
                                    description={this.state.description}
                                    internal = {this.state.internal}
                                    id = {this.state.id}
                                    />
                                </Grid>
                                </Grid>
                                <MUIRichTextEditor
                                    value={this.state.description}
                                    readOnly={true}
                                    toolbar={false}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CaseNoteCard;
