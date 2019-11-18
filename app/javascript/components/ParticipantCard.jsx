import React from 'react';
import PropTypes from 'prop-types';
import NewCaseNote from './NewCaseNote';
import PaperworkFrom from './PaperworkForm';

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
    let name = this.props.name;
    return (
      <tr onClick={this.showParticipant}>
        <td>{name}</td>
        <td><div className="status">{p.status}</div></td>
        <td className="new-assignment">
          <PaperworkFrom  participant_id={p.id}></PaperworkFrom>
        </td>
        <td className="new-casenote">
          <NewCaseNote  participant_id={p.id} />
        </td>
      </tr>
    );
  }
}

ParticipantCard.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantCard;
