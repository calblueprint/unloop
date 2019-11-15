import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from '@material-ui/core/Button';


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
        height: '200px'
    },
    casenoteTextStyle: {
        marginLeft: '15px'
    },
    casenoteDescStyle: {
        overflow: 'auto',
        height: '100px',
        marginTop: '-10px'
    },
}

class SimpleMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
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
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Delete</MenuItem>
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
            internal:this.props.interal,
        };
    }

    handleOpen() {
        
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
                                    <SimpleMenu/>
                                </Grid>
                                </Grid>
                                <p style={styles.casenoteDescStyle}>{this.state.description}</p>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CaseNoteCard;
