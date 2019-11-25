import React from 'react';
import PropTypes from 'prop-types';
import NewCaseNote from './NewCaseNote';
import PaperworkFrom from './PaperworkForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }
  showParticipant() {
    let pId = this.props.participant.id;
    window.location.assign('participants/' + String(pId));
  }

  render() {
    let p = this.props.participant;
    let status = p.status.toUpperCase();
    let name = p.name;
    return (
      <tr>
        <td style={{"cursor": "pointer"}} onClick={this.showParticipant}>{name}</td>
        <td>
          <div className="status">{status}</div>
        </td>
        <td className="new-assignment">
          <div>
            <FontAwesomeIcon icon={faEdit} size="lg"></FontAwesomeIcon>
            <PaperworkFrom participant_id={p.id}></PaperworkFrom>
          </div>
        </td>
        <td className="new-casenote">
          <div>
            <FontAwesomeIcon icon={faEdit} size="lg"></FontAwesomeIcon>
            <NewCaseNote participant_id={p.id} />
          </div>
        </td>
      </tr>
    );
  }
}

ParticipantCard.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantCard;
