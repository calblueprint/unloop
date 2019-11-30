import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NewCaseNote from 'components/NewCaseNote';
import CaseNoteCard from 'components/CaseNoteCard';
const styles = {
  headerStyle: {
    marginLeft: '20px',
    marginTop: '0px',
    marginBottom: '0px',
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
      caseNotes: this.props.caseNotes,
      participant: this.props.participant,
      userType: this.props.userType,
    };
  }

  renderCaseNoteCreationIfStaff() {
    if (this.state.userType === 'staff') {
      return (
        <Grid item xs={4} style={{ paddingBottom: '5px' }}>
          <NewCaseNote participantId={this.state.participant.id} />
        </Grid>
      );
    }
    return null;
  }

  renderCaseNoteCards() {
    if (this.state.caseNotes.length != 0) {
      const caseNoteCards = this.state.caseNotes.map(caseNote => (
        <div key={caseNote.id}>
          <CaseNoteCard
            title={caseNote.title}
            description={caseNote.description}
            internal={caseNote.internal}
          />
        </div>
      ));
      return caseNoteCards;
    }

    return (
      <div>
        <img
          src="/assets/noCaseNotes.svg"
          className="no-case-notes-img"
          alt="no Case Notes"
        />
        <div className="no-case-notes-txt">
          <h3>No case notes yet</h3>
          {this.state.userType === 'staff' ? (
            <p>Click on NEW CASENOTE + to create one.</p>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }

  render() {
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
                <Grid
                  container
                  justify="space-between"
                  style={{
                    borderBottom: '5px solid #EB6658',
                    marginBottom: '10px',
                  }}
                >
                  <Grid item xs={4} style={{ paddingBottom: '5px' }}>
                    <h2 style={styles.headerStyle}>Case Notes</h2>
                  </Grid>
                  {this.renderCaseNoteCreationIfStaff()}
                </Grid>
                <div
                  style={{
                    maxHeight: '80vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                  }}
                >
                  {this.renderCaseNoteCards()}
                </div>
              </div>
            </Typography>
          </Grid>
        </Container>
      </>
    );
  }
}
export default CaseNoteContainer;
