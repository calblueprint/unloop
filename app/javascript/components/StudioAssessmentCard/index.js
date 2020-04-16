import React from 'react';
import PropTypes from 'prop-types';


class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
    const assessment = this.props.assessment;

  }

  showParticipant() {
    const pId = this.props.assessment.id;
    window.location.assign(`participants/${String(pId)}`);
  }

  // <MenuItem value = {"overall"}>Overall Rankings  </MenuItem>
  //       <MenuItem value = {"bigPic"}>Big Picture       </MenuItem>
  //       <MenuItem value = {"progFun"}>Prog Fundamentals </MenuItem>
  //       <MenuItem value = {"verCon"}>Version Control   </MenuItem>
  //       <MenuItem value = {"react"}>React             </MenuItem>
  //       <MenuItem value = {"node"}>Node              </MenuItem>
  //       <MenuItem value = {"Db"}>Db                </MenuItem>
  //       <MenuItem value = {"probSol"}>Prob Solve        </MenuItem>
  //       <MenuItem value = {"probAlt"}>Prob Solve Alt    </MenuItem>

  nameCol() {
    return(
      <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {this.props.assessment.name}
        </td>
    );
  }

  bigPicCol() {
    if (this.props.selectedCat === "bigPic") {
      return (
        <td style="backgroundColor:#00a0ac;">
          {this.props.assessment.bigpictureScore}
        </td>
      );
    }
    else {
      return (
        <td>
          {this.props.assessment.bigpictureScore}
        </td>
      );
    }
  }

  render() {
    const assessment = this.props.assessment;
    const bigPic = assessment.bigpictureScore;
    const  prog = assessment.progfundamentalsScore;
    const  vc = assessment.versioncontrolScore;
    const  react = assessment.reactScore;
    const  node = assessment.nodeScore;
    const  db = assessment.dbScore;
    const probSolve = assessment.problemsolvingScore;
    const probSolveAlt = assessment.problemsolvingaltScore;


    return (
      <tr>
        {this.nameCol()}
        {this.bigPicCol()}
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
