/**
 *
 * AssignmentList
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Grid, 
  Paper, 
  List, 
  Button, 
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import ActionItemCard from 'components/ActionItemCard';
import ActionItemForm from 'components/ActionItemModal';
import { apiPost, apiDelete, apiPatch } from 'utils/axios';
import * as Sentry from '@sentry/browser';
import styles from './styles';

class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: this.props.initialAssignments,
      participantId: this.props.participantId,
      userType: this.props.userType,
      formatDate: this.props.formatDate,
      deleteModalOpen: false,
      newModalOpen: false,
      editModalOpen: false,
      // assignmentToDelete: null,
      // assignmentToEdit: null,
      modalAssignment: null,
    };
    this.appendStateAssignment = this.appendStateAssignment.bind(this);
    this.editStateAssignment = this.editStateAssignment.bind(this);
    this.deleteStateAssignment = this.deleteStateAssignment.bind(this);
    this.handleNewAssignment = this.handleNewAssignment.bind(this);
    this.handleEditAssignment = this.handleEditAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal(type, assignment) {
    if (!assignment) {
      assignment = null;
    }
    let modalOpen;
    switch (type) {
      case 'new':
        modalOpen = 'newModalOpen';
        break;
      case 'edit':
        modalOpen = 'editModalOpen';
        break;
      case 'delete':
        modalOpen = 'deleteModalOpen';
        break;
    }
    this.setState({
      modalAssignment: assignment,
      [modalOpen]: true,
    })
  }

  handleCloseModal() {
    this.setState({
      modalAssignment: null,
      newModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false
    })
  }

  appendStateAssignment(assignment) {
    console.log("trying to append");
    this.setState(prevState => ({
      assignments: [assignment, ...prevState.assignments],
    }));
  }

  editStateAssignment(assignmentResponse) {
    let actionItem = assignmentResponse.action_item;
    let correctAssignment = {
      actionItemId: actionItem.id,
      category: actionItem.category,
      description: actionItem.description,
      title: actionItem.title,
      dueDate: assignmentResponse.due_date,
      id: assignmentResponse.id,
      isTemplate: false, // Not sure about this one
      // createdAt: Not sure how to find this one
      // updatedAt: Not sure how to find this one
    }
    this.setState(prevState => {
      const toUpdate = [...prevState.assignments];
      const foundIndex = toUpdate.findIndex(
        assignment => assignment.id === correctAssignment.id
      );
      if (foundIndex !== -1) {
        toUpdate[foundIndex] = correctAssignment;
        return { assignments: toUpdate};
      }
      return {};
    })
  }

  deleteStateAssignment(assignment) {
    this.setState(prevState => {
      const remainingAssignments = prevState.assignments.filter(item => item.id !== assignment.id);
      return { assignments: remainingAssignments };
    });
  }

  editModal() {
    if (this.state.modalAssignment) {
      return (
        <ActionItemForm
          type={'edit'}
          title={this.state.modalAssignment.title}
          description={this.state.modalAssignment.description}
          dueDate={this.state.modalAssignment.dueDate}
          categorySelected={this.state.modalAssignment.category}
          open={this.state.editModalOpen}
          handleClose={() => this.handleCloseModal()}
          handleSubmit={this.handleEditAssignment}
          participantId={this.state.participantId}
          actionItemId={this.state.modalAssignment.actionItemId}
        />
      )
    }
  }

  deleteModal() {
    return (
      <Dialog
        open={this.state.deleteModalOpen}
        onClose={() => this.handleCloseModal()}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Are you sure you want to delete this assignment?</DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={() => this.handleDeleteAssignment()}
          >
            Delete
          </Button>
          <Button
            onClick={() => this.handleCloseModal()}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleNewAssignment(
    title,
    description,
    categorySelected,
    dueDate,
    addToTemplates,
    participantId,
  ) {

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
        .then((response) => {
          this.handleCloseModal();
          this.appendStateAssignment(response.data);
        })
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'AssignmentList');
            scope.setExtra('action', 'apiPost (createActionItem)');
            scope.setExtra('template', JSON.stringify(template));
          })
        })

    } else {

      // Add ActionItem to ActionItems
      const body = {
        assignments: [{
          title,
          description,
          category: categorySelected,
          due_date: dueDate,      
        }],
        participant_ids: [participantId],
      }

      apiPost('/api/assignments', body)
        .then((response) => {
          this.handleCloseModal();
          this.appendStateAssignment(response.data); // Limited testing for this functionality since MailCatcher fails for me
        })
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'AssignmentList');
            scope.setExtra('action', 'apiPost (handleNewAssignment)');
            scope.setExtra('participantId', participantId);
            scope.setExtra('body', JSON.stringify(actionItemBody));
          });
          Sentry.captureException(error);
        });
        // THIS IS ACTIONITEMCREATIONPAGE PAYLOAD FORMAT

          // const participantIds = this.state.selectedParticipants.map(
          //   participant => participant.id,
          // );
      
          // const assignments = this.state.selectedActionItems.map(actionItem => ({
          //   title: actionItem.title,
          //   description: actionItem.description,
          //   due_date: actionItem.dueDate,
          //   category: actionItem.category,
          // }));
      
          // const body = {
          //   assignments,
          //   participant_ids: participantIds,
          // };
          // apiPost('/api/assignments', body)
    }
  }

  handleEditAssignment(
    title,
    description,
    categorySelected,
    dueDate,
    addToTemplates,
    participantId,
  ) {

    // Edit ActionItem and send PATCH request
    const body = {
      assignment: {
        title,
        description,
        category: categorySelected,
        due_date: dueDate,      
      },
      participant_ids: [participantId],
    }

    apiPatch(`/api/assignments/${this.state.modalAssignment.id}`, body)
      .then((response) => {
        this.handleCloseModal();
        this.editStateAssignment(response.data);
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'AssignmentList');
          scope.setExtra('action', 'apiPatch (handleEditAssignment)');
          scope.setExtra('assignmentId', this.state.modalAssignment.id);
        });
        Sentry.captureException(error);
      });
  }

  handleDeleteAssignment() {
    const assignment = this.state.modalAssignment;

    // Make API request to delete assignment and remove assignment from state
    apiDelete(`/api/assignments/${assignment.id}`)
      .then(() => {
        this.handleCloseModal();
        this.deleteStateAssignment(assignment);
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'AssignmentList');
          scope.setExtra('action', 'apiDelete (handleDeleteAssignment)');
          scope.setExtra('assignmentId', assignment.id);
        });
        Sentry.captureException(error);
      });
  }

  assignmentEntries() {
    if (this.state.assignments.length !== 0) {
      const assignmentCards = this.state.assignments.map(assignment => (
        <ActionItemCard
          key={assignment.id}
          title={assignment.title}
          description={assignment.description}
          category={assignment.category}
          dueDate={this.state.formatDate(assignment.dueDate)}
          selected={false} // Dummy prop for this specific usage of ActionItemCard
          renderClose={false}
          editActionItem={() => {
            this.handleOpenModal("edit", assignment);
          }}
          removeActionItem={() => {
            this.handleOpenModal("delete", assignment);
          }}
        />
      ));
      return assignmentCards;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={3} className={classes.containerStyle}>
        {this.editModal()}
        {this.deleteModal()}
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
            {this.state.userType === 'staff' ? (
              <div>
                <Button color="primary" onClick={() => this.handleOpenModal("new")}>
                  New Assignment
                </Button>
                <ActionItemForm
                  open={this.state.newModalOpen}
                  handleClose={() => this.handleCloseModal()}
                  handleSubmit={this.handleNewAssignment}
                  participantId={this.state.participantId}
                />
              </div>
            ) : (
              <div />
            )}
          </Grid>
        </Grid>

        <List className={classes.listStyle} dense>
          {this.state.assignments.length !== 0 ? (
            this.assignmentEntries()
          ) : (
            <div>
              <img
                src="/assets/noPaperworks.svg"
                className={classes.noPaperworksImg}
                alt="no Assignments"
              />
              <div className={classes.noPaperworksTxt}>
                <h3>No assignments yet</h3>
                {this.state.userType === 'staff' ? (
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
}

AssignmentList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  initialAssignments: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(AssignmentList);
