import React from 'react';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ActionItemSearchParticipants from '../ActionItemSearchParticipants';
import ActionItemDisplayParticipants from '../ActionItemDisplayParticipants';
import styles from './styles';

class ActionItemSelectParticipants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
      selectedParticipants: [],
      openModal: false,
    };
    this.addUserToState = this.addUserToState.bind(this);
    this.removeUserFromState = this.removeUserFromState.bind(this);
    this.addAllUsersToState = this.addAllUsersToState.bind(this);
    this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
  }

  // Adds selected user to state to be displayed
  addUserToState(user) {
    this.setState(prevState => ({
      selectedParticipants: [...prevState.selectedParticipants, user],
    }));
  }

  // Removes user from display
  removeUserFromState(user) {
    this.setState(prevState => {
      const copy = [...prevState.selectedParticipants];
      const index = this.state.selectedParticipants.indexOf(user);
      copy.splice(index, 1); // Removes one element at `index` location
      return { selectedParticipants: copy };
    });
  }

  // Adds all users at once to be displayed
  addAllUsersToState(filteredParticipants) {
    const toAdd = [];
    const selectedIds = new Set(this.state.selectedParticipants.map(p => p.id));
    for (let i = 0; i < filteredParticipants.length; i += 1) {
      if (!selectedIds.has(filteredParticipants[i].id)) {
        toAdd.push(filteredParticipants[i]);
      }
    }

    this.setState(prevState => ({
      selectedParticipants: prevState.selectedParticipants.concat(toAdd),
    }));
  }

  // Removes all users at once from display
  removeAllUsersFromState(filteredParticipants) {
    const newParticipants = [];
    const filteredIds = new Set(filteredParticipants.map(p => p.id));
    for (let i = 0; i < this.state.selectedParticipants.length; i += 1) {
      if (!filteredIds.has(this.state.selectedParticipants[i].id)) {
        newParticipants.push(this.state.selectedParticipants[i]);
      }
    }

    this.setState({
      selectedParticipants: newParticipants,
    });
  }

  toggleModal() {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      // Overall component
      <div className={classes.entirePage}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.toggleModal()}
        >
          Open Modal
        </Button>
        <Dialog
          onClose={() => this.toggleModal()}
          open // {this.state.openModal}
          fullWidth
          maxWidth="lg"
        >
          <DialogContent style={{ overflow: 'hidden' }}>
            Create New Assignment List
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              {/* <div style={{display: 'flex', flexDirection: 'row', maxHeight: '80vh'}}> */}
              {/* Rendering left side of page (for listing people) */}
              <div>
                <ActionItemDisplayParticipants
                  selectedParticipants={this.state.selectedParticipants}
                />
              </div>

              {/* Rendering right side of page (for searching). */}
              <div>
                <ActionItemSearchParticipants
                  participants={this.state.participants}
                  selectedParticipants={this.state.selectedParticipants}
                  addUser={this.addUserToState}
                  removeUser={this.removeUserFromState}
                  addAllUsers={this.addAllUsersToState}
                  removeAllUsers={this.removeAllUsersFromState}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

ActionItemSelectParticipants.propTypes = {
  participants: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActionItemSelectParticipants);
