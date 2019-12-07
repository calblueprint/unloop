import React from 'react';
import PropTypes from 'prop-types';
import CaseNoteForm from './CaseNoteForm';
import PaperworkForm from './PaperworkForm';
import {
  faChevronRight,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
    console.log(this.props.participant);
  }

  showParticipant() {
    let pId = this.props.participant.id;
    window.location.assign('participants/' + String(pId));
  }

  render() {
    let p = this.props.participant;
    let status = p.status.toUpperCase();
    let name = p.name;

    let questionnaireStatus = p.questionnaireStatus ? (
      <FontAwesomeIcon icon={faCheck} color={'green'} size={'lg'}>
        complete
      </FontAwesomeIcon>
    ) : (
      <FontAwesomeIcon icon={faTimes} color={'red'} size={'lg'}>
        complete
      </FontAwesomeIcon>
    );

    let statusColor = status === "R1" ? "#DF6C8E" : "#5870EB";
    return (
      <tr>
        <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
        >
          {name}
        </td>
        <td>
          <div className="status"
                style={{"background-color": statusColor}}
          >{status}</div>
        </td>
        <td className="new-assignment">
          <div>
            {p.paperworksCompleted} / {p.paperworksCount} completed
            <PaperworkForm type={'plus'} participantId={p.id}></PaperworkForm>
          </div>
        </td>
        <td className="new-casenote">
          <div>
            {p.caseNotesCount} casenotes
            <CaseNoteForm type={'plus'} participantId={p.id}></CaseNoteForm>
          </div>
        </td>
        <td>{questionnaireStatus}</td>
        <td>
          <FontAwesomeIcon
            onClick={this.showParticipant}
            icon={faChevronRight}
            color="grey"
            size="lg"
          />
        </td>
      </tr>
    );
  }
}

ParticipantCard.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantCard;
