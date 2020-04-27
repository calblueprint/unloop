/**
 *
 * AssignmentList
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, List } from '@material-ui/core';
import ActionItemForm from 'components/ActionItemForm';
import ActionItemCard from 'components/ActionItemCard';

import styles from './styles';

function AssignmentList({
  classes,
  initialAssignments,
  userType,
  formatDate,
}) {
  const [assignments] = useState(initialAssignments);

  const assignmentEntries = assignments.map((assignment) => (
    <ActionItemCard
      key={assignment.id}
      title={assignment.title}
      description={assignment.description}
      category={assignment.category}
      dueDate={formatDate(assignment.created_at)}
    />
  ));

  return (
    <Paper elevation={3} className={classes.containerStyle}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.componentTitle}
      >
        <Grid item>
          <h3 className={classes.headerStyle}>Assignments</h3>
        </Grid>
        <Grid item>
          {/* Set logic to !== for rendering the button properly */}
          {userType !== 'staff' ? (
            // Make this a button to pop-up the modal to add a new assignment
            <ActionItemForm />
          ) : (
            <div />
          )}
        </Grid>
      </Grid>

      {/* Change these to handle rendering assignments instead */}

      <List className={classes.listStyle} dense>
        {assignments.length !== 0 ? (
          assignmentEntries
        ) : (
          <div>
            <img
              src="/assets/noPaperworks.svg"
              className={classes.noPaperworksImg}
              alt="no Case Notes"
            />
            <div className={classes.noPaperworksTxt}>
              <h3>No assignments yet</h3>
              {userType === 'staff' ? (
                <p>Click on ASSIGN ASSIGNMENT + to assign one.</p>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </List>
    </Paper>
  );
}

AssignmentList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  initialAssignments: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(AssignmentList);
