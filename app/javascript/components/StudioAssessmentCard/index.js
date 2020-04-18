import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
    const { assessment } = this.props;
  }

  showParticipant() {
    const pId = this.props.assessment.id;
    window.location.assign(`participants/${String(pId)}`);
  }

  render() {
    const { assessment } = this.props;
    const bigPic = assessment.bigpictureScore;
    const prog = assessment.progfundamentalsScore;
    const vc = assessment.versioncontrolScore;
    const react = assessment.reactScore;
    const node = assessment.nodeScore;
    const db = assessment.dbScore;
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
        <td className={currCategory === 'bigPic' ? classes.selected : null}>
          {bigPic}
        </td>
        <td className={currCategory === 'progFun' ? classes.selected : null}>
          {prog}
        </td>
        <td className={currCategory === 'verCon"' ? classes.selected : null}>
          {vc}
        </td>
        <td className={currCategory === 'react' ? classes.selected : null}>
          {react}
        </td>
        <td className={currCategory === 'node' ? classes.selected : null}>
          {node}
        </td>
        <td className={currCategory === 'Db' ? classes.selected : null}>
          {db}
        </td>
        <td className={currCategory === 'probSol' ? classes.selected : null}>
          {probSolve}
        </td>
        <td className={currCategory === 'probAlt' ? classes.selected : null}>
          {probSolveAlt}
        </td>
      </tr>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object.isRequired,
  selectedCat: PropTypes.String,
};

export default withStyles(styles)(StudioAssessmentCard);
