import React from 'react';
import { Typography, Container, Grid } from '@material-ui/core';
import NewCaseNote from 'containers/NewCaseNote';
import CaseNoteCard from 'containers/CaseNoteCard';
import PropTypes from 'prop-types';

class CaseNoteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caseNotes: this.props.caseNotes,
      participant: this.props.participant,
    };
  }

  render() {
    const caseNoteCards = this.state.caseNotes.map(caseNote => (
      <div key={caseNote.id}>
        <CaseNoteCard
          title={caseNote.title}
          description={caseNote.description}
          internal={caseNote.internal}
        />
      </div>
    ));

    return (
      <Container maxWidth="sm">
        <Grid>
          <Typography component="div" className="case-note-container">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <h2 className="case-note-header">Casenotes</h2>
              </Grid>
              <Grid item xs={5}>
                <NewCaseNote participant_id={this.state.participant.id} />
              </Grid>
            </Grid>
            <div className="case-note-cards">{caseNoteCards}</div>
          </Typography>
        </Grid>
      </Container>
    );
  }
}

CaseNoteContainer.propTypes = {
  caseNotes: PropTypes.array,
  participant: PropTypes.object,
};

export default CaseNoteContainer;
