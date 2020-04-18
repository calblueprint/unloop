import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CaseNoteForm from 'components/CaseNoteForm';
import PaperworkForm from 'components/PaperworkForm';
import { withStyles } from '@material-ui/core/styles';

import {
  faChevronRight,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TableCell from '@material-ui/core/TableCell';

import styles from './styles';

function ParticipantCard({ classes, participant }) {
  const showParticipant = () => {
    const pId = participant.id;
    window.location.assign(`participants/${String(pId)}`);
  };

  // disabled eslint to make styling consistent
  // eslint-disable-next-line
  const [numCaseNotes, setNumCaseNotes] = useState(participant.caseNotesCount);
  const [numPaperworks, setNumPaperworks] = useState(
    participant.paperworksCount,
  );

  const questionnaireStatus = participant.questionnaireStatus ? (
    <FontAwesomeIcon
      className={classes.iconLarge}
      icon={faCheck}
      color="green"
    ></FontAwesomeIcon>
  ) : (
    <FontAwesomeIcon
      className={classes.iconLarge}
      icon={faTimes}
      color="red"
    ></FontAwesomeIcon>
  );

  const caseNotes =
    numCaseNotes === 1
      ? `${numCaseNotes} case note`
      : `${numCaseNotes} case notes`;

  return (
    <>
      <TableCell
        style={{ cursor: 'pointer' }}
        onClick={showParticipant}
        onKeyDown={showParticipant}
      >
        {participant.name}
      </TableCell>
      <TableCell align="left">
        <div className={classes.status}>{participant.status.toUpperCase()}</div>
      </TableCell>
      <TableCell align="left" className={classes.newAssignment}>
        {participant.paperworksCompleted} / {numPaperworks} completed{' '}
        <PaperworkForm
          display="plus"
          type="create"
          participantId={participant.id}
          incrementNumPaperworks={() => setNumPaperworks(numPaperworks + 1)}
        ></PaperworkForm>
      </TableCell>
      <TableCell className={classes.newAssignment}>
        {caseNotes}
        <CaseNoteForm
          display="plus"
          type="create"
          participantId={participant.id}
          incrementNumCaseNotes={() => setNumCaseNotes(numCaseNotes + 1)}
        ></CaseNoteForm>
      </TableCell>
      <TableCell>{questionnaireStatus}</TableCell>
      <TableCell align="center">
        <FontAwesomeIcon
          onClick={showParticipant}
          icon={faChevronRight}
          color="grey"
          style={{ cursor: 'pointer' }}
          className={classes.iconLarge}
        />
      </TableCell>
    </>
  );
}

ParticipantCard.propTypes = {
  classes: PropTypes.object.isRequired,
  participant: PropTypes.object,
};

export default withStyles(styles)(ParticipantCard);
