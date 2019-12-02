import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CaseNoteForm from 'components/CaseNoteForm';
import CaseNoteCard from 'components/CaseNoteCard';
import PropTypes from 'prop-types';

const styles = {
  headerStyle: {
    marginLeft: '20px',
    marginTop: '0px',
    fontSize: '24px',
  },
};

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

class CaseNoteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      case_notes: this.props.caseNotes,
      participant: this.props.participant,
    };
  }

  render() {
    const caseNoteCards = this.state.case_notes.map(caseNote => (
      <div key={caseNote.id}>
        <CaseNoteCard
          title={caseNote.title}
          description={caseNote.description}
          internal={caseNote.internal}
          id={caseNote.id}
          participantId={caseNote.participant_id}
        />
      </div>
    ));

    return (
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <Grid>
            <Typography
              component="div"
              style={{ height: '100vh', maxHeight: '700px' }}
            >
              <div className={classes.root} style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <h2 style={styles.headerStyle}>Case Notes</h2>
                  </Grid>
                  <Grid item xs={5}>
                    <CaseNoteForm
                      type="create"
                      participantId={this.state.participant.id}
                    />
                  </Grid>
                </Grid>
                <div
                  style={{
                    maxHeight: '80vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100vh',
                  }}
                >
                  {caseNoteCards}
                </div>
              </div>
            </Typography>
          </Grid>
        </Container>
      </>
    );
  }
}

CaseNoteContainer.propTypes = {
  caseNotes: PropTypes.array,
  participant: PropTypes.object,
};

export default CaseNoteContainer;
