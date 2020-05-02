/**
 *
 * AssignmentList
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, List, Button, Dialog } from '@material-ui/core';
// import ActionItemForm from 'components/ActionItemForm';
import ActionItemCard from 'components/ActionItemCard';
import ActionItemForm from 'components/ActionItemModal';
import { apiPost, apiDelete } from 'utils/axios';
import * as Sentry from '@sentry/browser';
import styles from './styles';

function AssignmentList({ classes, initialAssignments, userType, formatDate }) {
  const [assignments] = useState(initialAssignments);
  const [open, setOpen] = useState(false);

  const assignmentEntries = assignments.map(assignment => (
    <ActionItemCard
      key={assignment.id}
      title={assignment.title}
      description={assignment.description}
      category={assignment.category}
      dueDate={formatDate(assignment.created_at)}
      selected={false} // Dummy prop for this specific usage of ActionItemCard
    />
  ));

  const deleteTemplate = (templateActionItem) => {
    if (!templateActionItem.is_template || !templateActionItem.id) {
      return;
    }
    apiDelete(`/api/assignments/templates/${templateActionItem.id}`)
      .then(() =>
        this.setState(prevState => {
          const remainingTemplates = prevState.templateActionItems.filter(
            item => item !== templateActionItem,
          );
          return { templateActionItems: remainingTemplates };
        }),
      )
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'ActionItemCreationPage');
          scope.setExtra('action', 'apiDelete');
          scope.setExtra('templateActionItemId', templateActionItem.id);
        });
        Sentry.captureException(error);
      });
    };

  const handleSubmit = (
    title,
    description,
    categorySelected,
    dueDate,
    addToTemplates,
    participantId,
  ) => {

    // Make new ActionItemTemplate
    if (addToTemplates) {

      const template = {
        title,
        description,
        category: categorySelected,
        dueDate,
        is_template: addToTemplates,
      };
      apiPost('/api/assignments/templates', { assignment: template })
        .then(resp => console.log(resp))
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'AssignmentList');
            scope.setExtra('action', 'apiPost (createActionItem)');
            scope.setExtra('template', JSON.stringify(template));
          })
        })
    }

    // Add ActionItem to ActionItems
    const actionItemBody = {
      assignments: [{
        title,
        description,
        category: categorySelected,
        due_date: dueDate,      
      }],
      participant_ids: [1],
    }
    console.log(actionItemBody);
    apiPost('/api/assignments', actionItemBody)
      .then((e) => {
        setOpen(false);
        console.log(e);
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'AssignmentList');
          scope.setExtra('action', 'apiPost (handleSubmit)');
          scope.setExtra('participantId', participantId);
          scope.setExtra('body', JSON.stringify(actionItemBody));
        });
        Sentry.captureException(error);
      });
  }

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
          {userType === 'staff' ? (
            // Make this a button to pop-up the modal to add a new assignment
            <div>
              <Button color="primary" onClick={() => setOpen(true)}>
                New Assignment
              </Button>
              <ActionItemForm
                open={open}
                handleClose={() => setOpen(false)}
                handleSubmit={handleSubmit} // this.handleSubmit
              />
            </div>
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
              alt="no Assignments"
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
