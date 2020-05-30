/**
 *
 * AssignmentList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  List,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import ActionItemCard from 'components/ActionItemCard';
import ActionItemModal from 'components/ActionItemModal';
import ViewMoreModal from 'components/ViewMoreModal';
import { apiPost, apiDelete, apiPatch } from 'utils/axios';
import * as Sentry from '@sentry/browser';
import styles from './styles';

class AssignmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: this.props.initialAssignments,
      deleteModalOpen: false,
      createModalOpen: false,
      editModalOpen: false,
      viewMoreModalOpen: false,
      modalAssignment: null,
    };
    this.appendStateAssignment = this.appendStateAssignment.bind(this);
    this.editStateAssignment = this.editStateAssignment.bind(this);
    this.deleteStateAssignment = this.deleteStateAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleEditAssignment = this.handleEditAssignment.bind(this);
    this.handleCreateAssignment = this.handleCreateAssignment.bind(this);
  }

  handleOpenModal(assignment) {
    return modalType => {
      let modalOpen;
      if (modalType === 'create') {
        modalOpen = 'createModalOpen';
      } else if (modalType === 'edit') {
        modalOpen = 'editModalOpen';
      } else if (modalType === 'delete') {
        modalOpen = 'deleteModalOpen';
      } else if (modalType === 'viewmore') {
        modalOpen = 'viewMoreModalOpen';
      }
      this.setState({
        modalAssignment: assignment,
        [modalOpen]: true,
      });
    };
  }

  handleCloseModal() {
    this.setState({
      modalAssignment: null,
      createModalOpen: false,
      editModalOpen: false,
      deleteModalOpen: false,
      viewMoreModalOpen: false,
    });
  }

  appendStateAssignment(assignment) {
    this.setState(prevState => ({
      assignments: [assignment, ...prevState.assignments],
    }));
  }

  editStateAssignment(newAssignment) {
    this.setState(prevState => {
      const toUpdate = [...prevState.assignments];
      const foundIndex = toUpdate.findIndex(
        assignment => assignment.id === newAssignment.id,
      );
      if (foundIndex !== -1) {
        toUpdate[foundIndex] = newAssignment;
        return { assignments: toUpdate };
      }
      return {};
    });
  }

  deleteStateAssignment(assignment) {
    this.setState(prevState => {
      const remainingAssignments = prevState.assignments.filter(
        item => item.id !== assignment.id,
      );
      return { assignments: remainingAssignments };
    });
  }

  editModal() {
    if (this.state.modalAssignment) {
      return (
        <ActionItemModal
          type="edit"
          title={this.state.modalAssignment.title}
          description={this.state.modalAssignment.description}
          dueDate={this.state.modalAssignment.due_date}
          categorySelected={this.state.modalAssignment.category}
          categories={this.props.categories}
          open={this.state.editModalOpen}
          handleClose={() => this.handleCloseModal()}
          handleSubmit={this.handleEditAssignment}
          participantId={this.props.participantId}
          actionItemId={this.state.modalAssignment.actionItemId}
          showAddToTemplates={false}
          fileURL={this.state.modalAssignment.fileURL}
        />
      );
    }
    return null;
  }

  viewMoreModal() {
    if (this.state.modalAssignment) {
      return (
        <ViewMoreModal
          description={this.state.modalAssignment.description}
          title={this.state.modalAssignment.title}
          category={this.state.modalAssignment.category}
          dueDate={this.state.modalAssignment.due_date}
          isCaseNote={false}
          open={this.state.viewMoreModalOpen}
          handleClose={() => this.handleCloseModal()}
          fileURL={this.state.modalAssignment.fileURL}
        />
      );
    }
    return null;
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
        <DialogTitle>
          Are you sure you want to delete this assignment?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => this.handleCloseModal()}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            onClick={() => this.handleDeleteAssignment()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleCreateAssignment({
    title,
    description,
    categorySelected,
    dueDate,
    participantId,
    file,
  }) {
    const singleForm = new FormData();
    singleForm.append('title', title);
    singleForm.append('description', description);
    singleForm.append('due_date', dueDate);
    singleForm.append('category', categorySelected);
    singleForm.append('file', file);
    singleForm.append('participant_ids', [participantId]);

    apiPost('/api/assignments', singleForm)
      .then(response => {
        this.handleCloseModal();
        this.appendStateAssignment(response.data[0]);
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'AssignmentList');
          scope.setExtra('action', 'apiPost (handleCreateAssignment)');
          scope.setExtra('participantId', participantId);
          scope.setExtra('body', JSON.stringify(singleForm));
        });
        Sentry.captureException(error);
      });
  }

  handleEditAssignment({
    title,
    description,
    categorySelected,
    dueDate,
    participantId,
    file,
    fileURL,
  }) {
    const singleForm = new FormData();
    singleForm.append('title', title);
    singleForm.append('description', description);
    singleForm.append('due_date', dueDate || '');
    singleForm.append('category', categorySelected);
    singleForm.append('file', file || '');
    singleForm.append('fileURL', fileURL || '');
    singleForm.append('participant_ids', [participantId]);

    const endpoint = '/api/assignments/'.concat(this.state.modalAssignment.id);
    apiPatch(endpoint, singleForm)
      .then(response => {
        this.handleCloseModal();
        this.editStateAssignment(response.data);
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'AssignmentList');
          scope.setExtra('action', 'apiPatch (handleEditAssignment)');
          scope.setExtra('participantId', participantId);
          scope.setExtra('body', JSON.stringify(singleForm));
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
    if (this.state.assignments) {
      const assignmentCards = this.state.assignments.map(assignment => (
        <ActionItemCard
          userType={this.props.userType}
          key={assignment.id}
          assignmentId={assignment.id}
          title={assignment.title}
          description={assignment.description}
          category={assignment.category}
          selected={false} // Dummy prop for not rendering check or add icons
          addBorderBottom
          renderClose={false} // Don't render close icon in dashboard assignment list
          handleOpenModal={this.handleOpenModal(assignment)}
          dueDate={assignment.due_date}
          removeActionItem={() => {
            this.handleOpenModal(assignment)('delete');
          }}
          // This prop tells whether or not the assignments are being rendered from the participantShowPage
          participantShowPage
          initialCompletedStaff={assignment.completed_staff}
          initialCompletedParticipant={assignment.completed_participant}
        />
      ));
      return assignmentCards;
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={3} className={classes.containerStyle}>
        {this.editModal()}
        {this.deleteModal()}
        {this.viewMoreModal()}
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
            {this.props.userType === 'staff' ? (
              <div>
                <Button
                  color="primary"
                  onClick={() => this.handleOpenModal(null)('create')}
                >
                  New Assignment
                </Button>
                {this.state.createModalOpen ? (
                  <ActionItemModal
                    type="create"
                    categories={this.props.categories}
                    open={this.state.createModalOpen}
                    handleClose={() => this.handleCloseModal()}
                    handleSubmit={this.handleCreateAssignment}
                    participantId={this.props.participantId}
                    showAddToTemplates={false}
                  />
                ) : null}
              </div>
            ) : (
              <div />
            )}
          </Grid>
        </Grid>

        <List className={classes.listStyle} dense>
          {this.state.assignments ? (
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
                {this.props.userType === 'staff' ? (
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
  categories: PropTypes.array.isRequired,
};

export default withStyles(styles)(AssignmentList);
