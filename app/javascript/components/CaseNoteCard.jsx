import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

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
    },
    casenoteTextStyle: {
        marginLeft: '15px',
    },
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

    componentDidMount() {
        
    }
    
    render () {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={11}>
                        <Paper className={classes.paper} style={styles.casenoteCardStyle}>
                            <div style={styles.casenoteTextStyle}>
                                <h3>{this.state.title}</h3>
                                <p>{this.state.description}</p>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CaseNoteCard;
