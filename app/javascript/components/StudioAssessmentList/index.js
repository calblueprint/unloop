/**
 *
 * Studio Assessment List
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, List, Container } from '@material-ui/core';
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

  const studioAssessmentEntries = studioAssessments.map(studioAssessment => (
    <div key={studioAssessment.id}>
      <Container style={{ padding: '0px' }}>
        <Paper style={{ marginTop: '10px', borderRadius: '10px' }}>
          <div className={classes.paddingBox}>
            <h3>{formatDate(studioAssessment.created_at)}</h3>
            {userType !== 'participant' ? (
              <StudioAssessmentModal
                studioAssessment={studioAssessment}
                userType={userType}
                participantId={participantId}
                type="edit"
              />
            ) : (
              <div />
            )}
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
          {/* Only admins and staff can see the create button */}
          {userType !== 'participant' ? (
            <StudioAssessmentModal
              participantId={participantId}
              userType={userType}
              type="create"
            />
          ) : (
            <div />
          )}
        </Grid>
      </Grid>
      {/* Listing out the different studioAssessments */}
      <List>
        {studioAssessments.length !== 0 ? (
          studioAssessmentEntries
        ) : (
          <div>
            <h2>No Studio Assessments</h2>
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
