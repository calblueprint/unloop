import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const classes = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

class CasenoteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            description: "",
            title: "",
            participant: "",
            internal: false,
        };
    }

    componentDidMount() {
        fetch('/casenotes/index')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        })
        .then(data => {
            console.log(data)
        });
        if (this.props.casenote_id !== null) {
            fetch('api/casenotes/1')
            .then(response => {
                if (response.ok) {
                    return response.json();   
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                this.setState({ 
                    id: data.id,
                    description: data.description,
                    title: data.title,
                    participant: data.participant,
                    internal: data.internal,
                 })
            });
             
        } else {
            console.log(
                `It looks like ${this.props} doesn't have a casenote id`
            );
        }
        
    }

    render () {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div>
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

export default CasenoteCard;