/**
 *
 * Studio Assessment List
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, List } from '@material-ui/core';
import StudioAssessmentModal from 'components/StudioAssessmentModal';
import PaperworkEntry from 'components/PaperworkEntry';
import PaperworkForm from 'components/PaperworkForm';
import ActionItemForm from 'components/ActionItemForm';
import {
  Fab,
  Typography,
} from '@material-ui/core';

import styles from './styles';

function StudioAssignmentList({
  classes,
  initialPaperworks,
  participantId,
  userType,
  formatDate,
}) {
  const [paperworks, setPaperworks] = useState(initialPaperworks);

  const updatePaperwork = updatedPaperwork => {
    const allPaperworks = [...paperworks];
    const paperworkIndex = allPaperworks.findIndex(
      paperwork => paperwork.id === updatedPaperwork.id,
    );
    if (paperworkIndex !== -1) {
      allPaperworks[paperworkIndex] = updatedPaperwork;
      setPaperworks(allPaperworks);
    }
  };

//   Switch these out with different assignment entries
  const paperworkEntries = paperworks.map((paperwork, i) => (
    <PaperworkEntry
      key={paperwork.id}
      paperwork={paperwork}
      participantId={participantId}
      userType={userType}
      date={formatDate(paperwork.created_at)}
      updatePaperwork={updatePaperwork}
      lastEntry={paperworks.length - 1 === i}
    />
  ));

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.componentTitle}
    >
      <Grid item>
        <h3 className={classes.headerStyle}>Studio Assessments</h3>
      </Grid>
      <Grid item>
        {/* Switch logic for rendering the button properly */}
        {userType !== 'staff' ? (
          <ActionItemForm />
        ) : (
          <div/>
        )}
      </Grid>
    </Grid>
      
      // {/* Change these to handle rendering assignments instead */}

      // {/* <List className={classes.listStyle} dense>
      //   {assignments.length !== 0 ? (
      //     assignmentEntries
      //   ) : (
      //     <div>
      //       <img
      //         src="/assets/noPaperworks.svg"
      //         className={classes.noPaperworksImg}
      //         alt="no Case Notes"
      //       />
      //       <div className={classes.noPaperworksTxt}>
      //         <h3>No assignments yet</h3>
      //         {userType === 'staff' ? (
      //           <p>Click on ASSIGN ASSIGNMENT + to assign one.</p>
      //         ) : (
      //           <div />
      //         )}
      //       </div>
      //     </div>
      //   )}
      // </List> */}
  );
}

StudioAssignmentList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  initialPaperworks: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudioAssignmentList);
