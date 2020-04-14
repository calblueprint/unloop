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
    const assessment = this.props.assessment;
    const bigPic = assessment.bigpicture_score;
    const  prog = assessment.progfundamentals_score;
    const  vc = assessment.versioncontrol_score;
    const  react = assessment.react_score;
    const  node = assessment.node_score;
    const  db = assessment.db_score;
    const probSolve = assessment.problemsolving_score;
    const probSolveAlt = assessment.problemsolvingalt_score;


    return (
      <tr>
        <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {assessment.participant_id}
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
        <td>
            {probSolve}
        </td>
        <td>
            {probSolveAlt}
        </td>
        
      </tr>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
};

export default StudioAssessmentCard ;
