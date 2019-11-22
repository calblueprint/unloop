import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NewCaseNote from 'components/NewCaseNote';
import CaseNoteCard from 'components/CaseNoteCard';

const styles = {
    headerStyle: {
        marginLeft: '20px',
        marginTop: '0px',
        fontSize: '24px', 
    }
}

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

class CaseNoteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            case_notes: this.props.caseNotes,
            participant: this.props.participant
        };
    }

    render () {
        let participant_id = 1;
        let case_note_cards = this.state.case_notes.map((case_note, index) => {
                return <div key={index}>
                    <CaseNoteCard 
                    title={case_note.title} 
                    description={case_note.description}
                    internal = {case_note.internal}
                    />
                </div>
            }
        );
        
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Grid>
                        <Typography component="div" style={{ backgroundColor: '#F4F4F4', height: '100vh', maxHeight: '700px'}}>
                            <div className={classes.root} style={{paddingTop: '20px'}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <h2 style={styles.headerStyle}>Casenotes</h2>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <NewCaseNote participant_id={this.state.participant.id}/>
                                    </Grid>
                                </Grid>
                                <div style={{ maxHeight: '80vh', overflowX: 'hidden', overflowY: 'auto', height: '100vh'}}>
                                    {case_note_cards}
                                </div>
                            </div>
                        </Typography>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default CaseNoteContainer;

