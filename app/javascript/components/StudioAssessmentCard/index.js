import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import TableCell from '@material-ui/core/TableCell';


class StudioAssessmentCard extends React.Component {
  constructor(props) {
    super(props);
    this.showParticipant = this.showParticipant.bind(this);
  }

  showParticipant() {
    const pId = this.props.assessment.participantId;
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
      <>
        <TableCell
          className="name"
          style={{ cursor: 'pointer' }}
          onClick={this.showParticipant}
          onKeyDown={this.showParticipant}
        >
          {this.props.assessment.name}
        </TableCell>
        <TableCell
          className={
            currCategory === 'bigpictureScore' ? classes.selected : null
          }
        >
          {bigPic}
        </TableCell>
        <TableCell
          className={
            currCategory === 'progfundamentalsScore' ? classes.selected : null
          }
        >
          {prog}
        </TableCell>
        <TableCell
          className={
            currCategory === 'versioncontrolScore' ? classes.selected : null
          }
        >
          {vc}
        </TableCell>
        <TableCell className={currCategory === 'reactScore' ? classes.selected : null}>
          {react}
        </TableCell>
        <TableCell className={currCategory === 'dbScore' ? classes.selected : null}>
          {db}
        </TableCell>
        <TableCell className={currCategory === 'nodeScore' ? classes.selected : null}>
          {node}
        </TableCell>
        <TableCell
          className={
            currCategory === 'problemsolvingScore' ? classes.selected : null
          }
        >
          {probSolve}
        </TableCell>
        <TableCell
          className={
            currCategory === 'problemsolvingaltScore' ? classes.selected : null
          }
        >
          {probSolveAlt}
        </TableCell>
      </>
    );
  }
}

StudioAssessmentCard.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object.isRequired,
  selectedCat: PropTypes.string,
};

export default withStyles(styles)(StudioAssessmentCard);
