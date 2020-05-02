import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CaseNoteForm from 'components/CaseNoteForm';
import CaseNoteCard from 'components/CaseNoteCard';
import ViewMoreModal from 'components/ViewMoreModal';
import PropTypes from 'prop-types';
import styles from './styles';

class CaseNoteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseNotes: this.props.caseNotes,
      participant: this.props.participant,
      userType: this.props.userType,
      title: '',
      description: '',
      modalOpen: false,
    };
    this.appendCaseNote = this.appendCaseNote.bind(this);
    this.updateCaseNote = this.updateCaseNote.bind(this);
    this.handleCloseViewMoreModal = this.handleCloseViewMoreModal.bind(this);
    this.handleOpenViewMoreModal = this.handleOpenViewMoreModal.bind(this);
  }

  handleCloseViewMoreModal() {
    this.setState({ modalOpen: false, title: '', description: '' });
  }

  handleOpenViewMoreModal(title, description) {
    this.setState({ title, description, modalOpen: true });
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
            appendCaseNote={this.appendCaseNote}
          />
        </Grid>
      );
    }
    return null;
  }

  appendCaseNote(caseNote) {
    this.setState(prevState => ({
      caseNotes: [caseNote, ...prevState.caseNotes],
    }));
  }

  updateCaseNote(updatedCaseNote) {
    this.setState(prevState => {
      const updatedCaseNotes = [...prevState.caseNotes];
      const caseNoteIndex = updatedCaseNotes.findIndex(
        caseNote => caseNote.id === updatedCaseNote.id,
      );
      if (caseNoteIndex !== -1) {
        updatedCaseNotes[caseNoteIndex] = updatedCaseNote;
        return { caseNotes: updatedCaseNotes };
      }
      return {};
    });
  }

  renderCaseNoteCards() {
    const { classes } = this.props;

    if (this.state.caseNotes.length !== 0) {
      const caseNoteCards = this.state.caseNotes.map(caseNote => (
        <CaseNoteCard
          key={caseNote.id}
          title={caseNote.title}
          description={caseNote.description}
          visible={caseNote.visible}
          caseNoteId={caseNote.id}
          participantId={this.state.participant.id}
          showMenu={this.state.userType === 'staff'}
          updateCaseNote={this.updateCaseNote}
          handleOpenViewMore={this.handleOpenViewMoreModal}
        />
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
        <ViewMoreModal
          title={this.state.title}
          description={this.state.description}
          open={this.state.modalOpen}
          handleClose={this.handleCloseViewMoreModal}
          isCaseNote
        />
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
