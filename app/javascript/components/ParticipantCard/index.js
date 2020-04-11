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
import theme from 'utils/theme';
import styles from './styles';

function ParticipantCard({ classes, participant }) {
  const showParticipant = () => {
    const pId = participant.id;
    window.location.assign(`participants/${String(pId)}`);
  };

  // disabled eslint to make styling consistent
  // eslint-disable-next-line
  const [numCaseNotes, setNumCaseNotes] = useState(
    participant.caseNotesCount,
  );
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

  let statusColor;
  const status = participant.status.toUpperCase();
  if (status === 'R0') {
    statusColor = theme.palette.primary.light;
  } else if (status === 'R1') {
    statusColor = '#5870EB';
  } else {
    statusColor = '#DF6C8E';
  }

  const caseNotes =
    numCaseNotes === 1
      ? `${numCaseNotes} case note`
      : `${numCaseNotes} case notes`;

  return (
    <tr>
      <td
        className={classes.name}
        style={{ cursor: 'pointer' }}
        onClick={showParticipant}
        onKeyDown={showParticipant}
      >
        {participant.name}
      </td>
      <td>
        <div
          className={classes.status}
          style={{ backgroundColor: statusColor }}
        >
          {status}
        </div>
      </td>
      <td className={classes.newAssignment}>
        <div>
          <div className={classes.paperworkText}>
            {participant.paperworksCompleted} / {numPaperworks} completed{' '}
          </div>
          <PaperworkForm
            display="plus"
            type="create"
            participantId={participant.id}
            incrementNumPaperworks={() => setNumPaperworks(numPaperworks + 1)}
          ></PaperworkForm>
        </div>
      </td>
      <td className={classes.newAssignment}>
        <div>
          <div className={classes.caseNoteText}>{caseNotes}</div>
          <CaseNoteForm
            display="plus"
            type="create"
            participantId={participant.id}
            incrementNumCaseNotes={() => setNumCaseNotes(numCaseNotes + 1)}
          ></CaseNoteForm>
        </div>
      </td>
      <td>
        <div className={classes.questionnaireStatus}>{questionnaireStatus}</div>
      </td>
      <td className={classes.arrow}>
        <FontAwesomeIcon
          onClick={showParticipant}
          icon={faChevronRight}
          color="grey"
          style={{ cursor: 'pointer' }}
          className={classes.iconLarge}
        />
      </td>
    </tr>
  );
}

ParticipantCard.propTypes = {
  classes: PropTypes.object.isRequired,
  participant: PropTypes.object,
};

export default withStyles(styles)(ParticipantCard);
