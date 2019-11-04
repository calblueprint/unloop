import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NewCasenote from 'components/NewCasenote';
import CasenoteCard from 'components/CasenoteCard';

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

class CasenoteContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            
        };
    }

    

    render () {
        return (
            <React.Fragment>
                 <CssBaseline />
                <Container maxWidth="sm">
                    <Grid>
                    
                        <Typography component="div" style={{ backgroundColor: '#F4F4F4', height: '100vh' }}>
                            <div className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <h2>Casenotes</h2>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <NewCasenote/>
                                    </Grid>
                                </Grid>

                                <CasenoteCard/>
                                <CasenoteCard/>
                                <CasenoteCard/>
                            </div>
                        </Typography>
                    </Grid>
                    
                    
                </Container>
            </React.Fragment>
        );
    }
}

export default CasenoteContainer;
