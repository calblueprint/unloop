import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles} from '@material-ui/core/styles';

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
  // className={currCategory === “category 0” ? classes.selectedColumn : classes.column}’


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
    const { classes } = this.props;
    const currCategory = this.props.selectedCat;
    return (
      <tr>
        <td
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {this.props.assessment.name}
        </td>
        <td className={currCategory === 'bigPic' ? classes.selected: null}>
          {bigPic}
        </td>
        <td className={currCategory === 'progFun' ? classes.selected: null}>
            {prog}
        </td>
        <td className={currCategory === 'verCon"' ? classes.selected: null}>
            {vc}
        </td>
        <td className={currCategory === 'react' ? classes.selected: null}>
           {react}
        </td>
        <td className={currCategory === 'node' ? classes.selected: null}>
            {node}
        </td>
        <td className={currCategory === 'Db' ? classes.selected: null}>
            {db}
        </td>
        <td className={currCategory === 'probSol' ? classes.selected: null}>
            {probSolve}
        </td>
        <td className={currCategory === 'probAlt' ? classes.selected: null}>
            {probSolveAlt}
        </td>
        
      </tr>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
};

export default withStyles(styles)(StudioAssessmentCard);
