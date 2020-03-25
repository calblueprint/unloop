import React from 'react';
import PropTypes from 'prop-types';


class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }

  showParticipant() {
    const pId = this.props.assessment.participant_id;
    window.location.assign(`participants/${String(pId)}`);
  }

  render() {
    const ass = this.props.assessment;
    let bigPic = ass.bigpicture_score;
    let prog = ass.progfundamentals_score;
    let vc = ass.versioncontrol_score;
    let react = ass.react_score;
    let node = ass.node_score;
    let db = ass.db_score;

    return (
      <tr>
        <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {ass.participant_id}
        </td>
        <td>
            {bigPic}
        </td>
        <td>
            {prog}
        </td>
        <td>
            {vc}
        </td>
        <td>
           {react}
        </td>
        <td>
            {node}
        </td>
        <td>
            {db}
        </td>
      </tr>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
};

export default StudioAssessmentCard ;
