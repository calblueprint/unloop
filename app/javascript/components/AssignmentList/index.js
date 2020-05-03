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
import { apiPost, apiDelete } from 'utils/axios';
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
      assignmentToDelete: null,
      assignmentToEdit: null,
    };
    this.appendStateAssignment = this.appendStateAssignment.bind(this);
    this.editStateAssignment = this.editStateAssignment.bind(this);
    this.deleteStateAssignment = this.deleteStateAssignment.bind(this);
    this.handleNewAssignment = this.handleNewAssignment.bind(this);
    this.handleEditAssignment = this.handleEditAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleOpenNewModal = this.handleOpenNewModal.bind(this);
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
  }


// function AssignmentList({ classes, initialAssignments, participantId, userType, formatDate }) {
//   const [assignments, setAssignments] = useState(initialAssignments);
//   const [open, setOpen] = useState(false);
//   const [openDeleteModal, setDeleteModal] = useState(false);

  handleOpenNewModal(state) {
    this.setState(prevState => ({
      newModalOpen: state
    }));
  }

  handleOpenEditModal(state) {
    this.setState(prevState => ({
      editModalOpen: state
    }))
  }

  handleOpenDeleteModal(state) {
    this.setState(prevState => ({
      deleteModalOpen: state
    }));
  } 

  appendStateAssignment(assignment) {
    this.setState(prevState => ({
      assignments: [assignment, ...prevState.assignments],
    }));
  }

  // Make the function for editing any assignments here
  editStateAssignment(updatedAssignment) {
    this.setState(prevState => {
      const toUpdate = [...prevState.assignments];
      const foundIndex = toUpdate.findIndex(
        assignment => assignment.id === updatedAssignment.id
      );
      if (foundIndex !== -1) {
        toUpdate[foundIndex] = updatedAssignment;
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

  // New Assignment modal taken from ActionItemModal

  editModal() {
    if (this.state.assignmentToEdit) {
      console.log("trying to edit this one", this.state.assignmentToEdit);
      console.log("new title", this.state.assignmentToEdit.title);
      return (
        <ActionItemForm
          type={'edit'}
          title={this.state.assignmentToEdit.title}
          description={this.state.assignmentToEdit.description}
          dueDate={this.state.assignmentToEdit.dueDate}
          categorySelected={this.state.assignmentToEdit.category}
          open={this.state.editModalOpen}
          handleClose={() => this.handleOpenEditModal(false)}
          handleSubmit={this.handleEditAssignment}
          participantId={this.state.participantId}
          // actionItemId={this.state.assignmentToEdit.actionItemId} This doesn't exist yet for some reason
        />
      )
    }
  }

  deleteModal() {
    return (
      <Dialog
        open={this.state.deleteModalOpen}
        onClose={() => this.handleOpenDeleteModal(false)}
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
        .then(response => console.log(response))
        .catch(error => {
          Sentry.configureScope(function(scope) {
            scope.setExtra('file', 'AssignmentList');
            scope.setExtra('action', 'apiPost (createActionItem)');
            scope.setExtra('template', JSON.stringify(template));
          })
        })
    }

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

    const production = false;
    if (production) {

      apiPost('/api/assignments', body)
        .then((response) => {
          this.handleOpenNewModal(false);
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

    } else {

      this.handleOpenNewModal(false);
      this.appendStateAssignment(body.assignments[0]);

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
    console.log("trying to edit here!");
  }

    // const editActionItem = (actionItem) => {

  // }

  // For editing caseNotes

  // this.setState(prevState => ({
  //   description: prevState.tempDescription,
  // }));

  // const body = {
  //   title: this.state.title,
  //   description: this.state.tempDescription,
  //   visible: this.state.visible,
  //   participant_id: this.state.participant_id,
  // };
  // apiPatch(`/api/case_notes/${this.state.caseNoteId}`, {
  //   case_note: body,
  // })
  //   .then(response => {
  //     this.props.updateCaseNote(response.data);
  //     this.setState({ open: false });
  //   })
  //   .catch(error => {
  //     Sentry.configureScope(function(scope) {
  //       scope.setExtra('file', 'CaseNoteForm');
  //       scope.setExtra('action', 'apiPatch');
  //       scope.setExtra('case_note', JSON.stringify(body));
  //     });
  //     Sentry.captureException(error);
  //   });

  handleDeleteAssignment() {
    if (!this.state.assignmentToDelete) {
      console.log("Trying to delete an assignment without selecting one! This error should not be possible.");
    } else {
      const assignment = this.state.assignmentToDelete;

      const production = false;
      if (production) { // For testing purposes
      
        // Make API request to delete assignment and remove assignment from state
        apiDelete(`api/assignments/${assignment.id}`)
          .then(() => {
            this.handleOpenDeleteModal(false);
            this.deleteStateAssignment(assignment);
          })
          .catch(error => {
            Sentry.configureScope(function(scope) {
              scope.setExtra('file', 'AssignmentList');
              scope.setExtra('action', 'apiDelete');
              scope.setExtra('assignmentId', assignment.id);
            });
            Sentry.captureException(error);
          });

      } else {
        this.handleOpenDeleteModal(false);
        this.deleteStateAssignment(assignment);
        this.setState(prevState => {
          const remainingAssignments = prevState.assignments.filter(item => item.id !== assignment.id);
          return { assignments: remainingAssignments };
        });

      }
    }
  }

  // ActionItemForm.propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   type: PropTypes.oneOf(['create', 'edit']),
  //   title: PropTypes.string,
  //   description: PropTypes.string,
  //   dueDate: PropTypes.string,
  //   categorySelected: PropTypes.string,
  //   open: PropTypes.bool.isRequired,
  //   participantId: PropTypes.number,
  //   actionItemId: PropTypes.number,
  //   handleClose: PropTypes.func.isRequired,
  //   handleSubmit: PropTypes.func.isRequired,
  // };
  // ActionItemForm.defaultProps = {
  //   title: '',
  //   type: 'create',
  //   description: '',
  //   dueDate: '',
  //   categorySelected: '',
  // };



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
            this.handleOpenEditModal(true);
            console.log("trying to edit", assignment);
            this.setState({
              assignmentToEdit: assignment
            })
            console.log(this.state.assignmentToEdit);
          }}
          removeActionItem={() => {
            this.handleOpenDeleteModal(true);
            this.setState({
              assignmentToDelete: assignment
            })
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
              // Make this a button to pop-up the modal to add a new assignment
              <div>
                <Button color="primary" onClick={() => this.handleOpenNewModal(true)}>
                  New Assignment
                </Button>
                <ActionItemForm
                  open={this.state.newModalOpen}
                  handleClose={() => this.handleOpenNewModal(false)}
                  handleSubmit={this.handleNewAssignment}
                  participantId={this.state.participantId}
                />
              </div>
            ) : (
              <div />
            )}
          </Grid>
        </Grid>

        {/* Change these to handle rendering assignments instead */}

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
