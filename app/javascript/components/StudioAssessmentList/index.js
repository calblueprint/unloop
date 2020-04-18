/**
 *
 * Studio Assessment List
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Paper, 
  List, 
  Container 
} from '@material-ui/core';
import StudioAssessmentModal from 'components/StudioAssessmentModal';
import styles from './styles';

function StudioAssessmentList({
  classes,
  formatDate,
  initialStudioAssessments,
  participantId,
  userType,
}) {
  const [studioAssessments] = useState(initialStudioAssessments);
  // const updateStudioAssessment = updatedAssessments => {
  //   const allAssessments = [...studioAssessments];
  //   const assessmentIndex = allAssessments.findIndex(
  //     assessment => assessment.id === updatedAssessments.id,
  //   );
  //   if (assessmentIndex !== -1) {
  //     allAssessments[assessmentIndex] = updatedAssessments;
  //     setPaperworks(allAssessments);
  //   }
  // };
  console.log("studioAssessments", studioAssessments);
  console.log("formatDate", formatDate);
  console.log("initialStudioAssessments", initialStudioAssessments);
  console.log("participantId", participantId);
  console.log("userType", userType);

  // let createdDate = studioAssessments['created_at'];

  const studioAssessmentEntries = studioAssessments.map(studioAssessment => (
    <div>
      {/* Only admins can edit the different studioAssessments */}
      {userType === 'admin' ? (
      <StudioAssessmentModal
        studioAssessment={studioAssessment}
        userType={userType}
        participantId={participantId}
        type="edit"
      />
      ) : (
        <div/>
      )}
      <Container style={{padding: '0px'}}>
          <Paper style={{marginTop: '10px', borderRadius: '10px'}}>
            <div className={classes.paddingBox}>
              <h3>
                {formatDate(studioAssessment['created_at'])}
              </h3>
              {/* Everyone should be able to view */}
              <StudioAssessmentModal
                studioAssessment={studioAssessment}
                userType={userType}
                participantId={participantId}
                type="view"
              />
            </div>
          </Paper>
      </Container>
    </div>
  ));

  return (

    // This should render similarly to Paperwork notes
    
    // 1. Title Bar (without surrounding box, maybe like CaseNotes?)
    // 2. Render new assessment button if the current user is a 'staff'
    // 3. List out all the cards, but only let staff modify the modal. Participants
    //    can only view (similar to how questionaires look for participants)

    <div className={classes.containerStyle}>
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
          {/* Only admins can see the create button */}
          {userType === 'admin' ? ( 
            <StudioAssessmentModal
              participantId={participantId}
              studioAssessment={studioAssessments[0]}
              userType={userType}
              type="create"
            />
          ) : (
            <div/>
          )}
        </Grid>
      </Grid>
      {/* Listing out the different studioAssessments */}
      <List>
        {studioAssessments.length !== 0 ? (
          studioAssessmentEntries
        ) : (
          <div>
            <h2>no studio assessments assigned</h2>
          </div>
        )}
      </List>
    </div>
  );
}

StudioAssessmentList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  formatDate: PropTypes.func,
  initialStudioAssessments: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
};

export default withStyles(styles)(StudioAssessmentList);