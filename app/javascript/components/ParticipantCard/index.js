import React from 'react';
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

class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }

  showParticipant() {
    const pId = this.props.participant.id;
    window.location.assign(`participants/${String(pId)}`);
  }

  render() {
    const p = this.props.participant;
    const { classes } = this.props;
    const status = p.status.toUpperCase();
    const { name } = p;

    const questionnaireStatus = p.questionnaireStatus ? (
      <FontAwesomeIcon
        className="icon-large"
        icon={faCheck}
        color="green"
      ></FontAwesomeIcon>
    ) : (
      <FontAwesomeIcon
        className="icon-large"
        icon={faTimes}
        color="red"
      ></FontAwesomeIcon>
    );

    let statusColor;
    if (status === 'R0') {
      statusColor = theme.palette.primary.light;
    } else if (status === 'R1') {
      statusColor = '#5870EB';
    } else {
      statusColor = '#DF6C8E';
    }
    const caseNotes =
      p.caseNotesCount === 1
        ? `${p.caseNotesCount} case note`
        : `${p.caseNotesCount} case notes`;
    return (
      <tr>
        <td
          className={classes.name}
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {name}
        </td>
        <td>
          <div className="status" style={{ backgroundColor: statusColor }}>
            {status}
          </div>
        </td>
        <td className={classes.newAssignment}>
          <div>
            {p.paperworksCompleted} / {p.paperworksCount} completed
            <PaperworkForm
              display="plus"
              type="create"
              participantId={p.id}
            ></PaperworkForm>
          </div>
        </td>
        <td className={classes.newAssignment}>
          <div>
            <div className={classes.caseNoteText}>{caseNotes}</div>
            <CaseNoteForm
              display="plus"
              type="create"
              participantId={p.id}
            ></CaseNoteForm>
          </div>
        </td>
        <td>
          <div className={classes.questionnaireStatus}>
            {questionnaireStatus}
          </div>
        </td>
        <td className={classes.arrow}>
          <FontAwesomeIcon
            onClick={this.showParticipant}
            icon={faChevronRight}
            color="grey"
            style={{ cursor: 'pointer' }}
            className="icon-large"
          />
        </td>
      </tr>
    );
  }
}

ParticipantCard.propTypes = {
  classes: PropTypes.object.isRequired,
  participant: PropTypes.object,
};

export default withStyles(styles)(ParticipantCard);
