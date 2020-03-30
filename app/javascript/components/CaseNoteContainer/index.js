import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CaseNoteForm from 'components/CaseNoteForm';
import CaseNoteCard from 'components/CaseNoteCard';
import PropTypes from 'prop-types';
import styles from './styles';

class CaseNoteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseNotes: this.props.caseNotes,
      participant: this.props.participant,
      userType: this.props.userType,
    };
  }

  formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dt = dateObj.getDate();
    return `${month.toString()}/${dt.toString()}/${year.toString()}`;
  }

  renderCaseNoteCreationIfStaff() {
    if (this.state.userType === 'staff') {
      return (
        <Grid item style={{ paddingBottom: '20px' }}>
          <CaseNoteForm
            type="create"
            participantId={this.state.participant.id}
          />
        </Grid>
      );
    }
    return null;
  }

  renderCaseNoteCards() {
    const { classes } = this.props;

    if (this.state.caseNotes.length !== 0) {
      const caseNoteCards = this.state.caseNotes.map(caseNote => (
        <div key={caseNote.id}>
          <CaseNoteCard
            title={caseNote.title}
            description={caseNote.description}
            visible={caseNote.visible}
            id={caseNote.id}
            participantId={this.state.participant.id}
            showMenu={this.state.userType === 'staff'}
            date={this.formatDate(caseNote.created_at)}
          />
        </div>
      ));
      return caseNoteCards;
    }

    return (
      <div>
        <img
          src="/assets/noCaseNotes.svg"
          className={classes.noCaseNotesImg}
          alt="no Case Notes"
        />
        <div className={classes.noCaseNotesTxt}>
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
    const { classes } = this.props;
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
                    marginBottom: '25px',
                  }}
                >
                  <Grid item xs={4}>
                    <h2 className={classes.headerStyle}>Casenotes</h2>
                  </Grid>
                  {this.renderCaseNoteCreationIfStaff()}
                </Grid>
                <div
                  style={{
                    height: '80vh',
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

CaseNoteContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  caseNotes: PropTypes.array,
  participant: PropTypes.object,
  userType: PropTypes.string.isRequired,
};

export default withStyles(styles)(CaseNoteContainer);
