import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputBase,
  Fab,
  Grid,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';
import ActionItemParticipant from '../ActionItemParticipant';
import styles from './styles';

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
  constructor(props) {
    super(props);
    // The following dictionary keeps track of each participants to see if they've been selected or not (by the checkmark),
    // and whether not they should be visible, depending on which category and search are input to filter the participants on.
    this.state = {
      statuses: this.props.statuses,
      selectedStatus: null,
      filteredParticipants: this.props.participants,
      searchValue: '',
    };
    this.filterByName = this.filterByName.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
    this.allSelect = this.allSelect.bind(this);
  }

  // Load in all the different participants from a 'TrieSearch' by name
  componentDidMount() {
    const trie = new TrieSearch('name');
    trie.addAll(this.props.participants);
    this.setState({
      trie,
    });
  }

  // For searching the different participants
  // Can only be rendered if found in the Trie AND is appropriate category (category is first filter, name is second)
  filterParticipants(searchVal, status) {
    // Find filtered participants via Trie
    let filterTemp;
    if (searchVal === '') {
      filterTemp = this.props.participants;
    } else {
      filterTemp = this.state.trie.get(searchVal);
    }

    // Make set of participants from filterTemp
    const participants = [];
    filterTemp.forEach(p => {
      if (status === null || p.status === status) {
        participants.push(p);
      }
    });

    this.setState({
      filteredParticipants: participants,
    });
  }

  filterByName(e) {
    this.setState({
      searchValue: e.target.value,
    });
    this.filterParticipants(e.target.value, this.state.selectedStatus);
  }

  filterByStatus(status) {
    // 1. You click a filter, either a different one or for the first time.
    // 2. You click the same filter, rendering everyone again.

    // 1
    if (this.state.selectedStatus !== status) {
      this.setState({
        selectedStatus: status,
      });
      this.filterParticipants(this.state.searchValue, status);
      // 2
    } else {
      this.setState({
        selectedStatus: null,
      });
      this.filterParticipants(this.state.searchValue, null);
    }
  }

  // Change the state for one of the child components when the 'plus' button is toggled and passes this info to parent class.
  changeChecked(user) {
    if (this.isSelected(user)) {
      this.props.removeUser(user);
    } else {
      this.props.addUser(user);
    }
  }

  // For selecting or de-selecting all participants
  allSelect(e) {
    if (e.target.checked) {
      this.props.addAllUsers(this.state.filteredParticipants);
    } else {
      this.props.removeAllUsers(this.state.filteredParticipants);
    }
  }

  // Creates and returns the status buttons
  statusButtons() {
    return Object.keys(this.state.statuses).map(status => {
      const importedStyles = styles().statusButton;
      const dark = theme.palette.common[status];
      const light = theme.palette.lighterButton[status];
      if (this.state.selectedStatus !== status) {
        importedStyles.backgroundColor = dark;
        importedStyles.color = theme.palette.common.white;
      } else {
        importedStyles.backgroundColor = light;
        importedStyles.color = dark;
      }
      return (
        <Fab
          style={importedStyles}
          onClick={() => this.filterByStatus(status)}
          key={status}
        >
          {status}
        </Fab>
      );
    });
  }

  isSelected(p) {
    for (let i = 0; i < this.props.selectedParticipants.length; i += 1) {
      const selectedP = this.props.selectedParticipants[i];
      if (p.id === selectedP.id) {
        return true;
      }
    }
    return false;
  }

  isAllSelected() {
    if (this.state.filteredParticipants.length === 0) {
      return false;
    }
    for (let i = 0; i < this.state.filteredParticipants.length; i += 1) {
      const filterP = this.state.filteredParticipants[i];
      if (!this.isSelected(filterP)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { classes } = this.props;
    const participantCards = this.state.filteredParticipants.map(p => {
      // Must have currently selected category and search
      const isSelected = this.isSelected(p);
      return (
        <ActionItemParticipant
          key={p.id}
          participant={p}
          checked={isSelected}
          changeChecked={this.changeChecked}
        />
      );
    });

    return (
      <Grid
        container
        className={classes.boundaryBox}
        direction="column"
        alignItems="center"
        justifycontent="space-evenly"
        justify="center"
      >
        {/* Filter By Category */}
        <Grid item className={classes.categoryItem}>
          <Typography variant="body1">FILTER BY CATEGORY</Typography>
          <Grid item>{this.statusButtons()}</Grid>
        </Grid>

        {/* Search for an individual */}
        <Grid container direction="column" className={classes.searchIndividual}>
          <Typography variant="body1">SEARCH FOR INDIVIDUAL</Typography>
          <Grid item>
            <InputBase
              className={classes.searchBar}
              onChange={this.filterByName}
              value={this.state.searchValue}
            />
          </Grid>
        </Grid>

        {/* List all the participant cards in scrolling fashion */}
        <Grid item className={classes.searchScroll}>
          <Grid item>{participantCards}</Grid>
        </Grid>

        {/* Select All Button */}
        <Grid item className={classes.selectAll}>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={this.isAllSelected()}
                onClick={this.allSelect}
              />
            }
            label="SELECT ALL"
          />
        </Grid>
      </Grid>
    );
  }
}

ActionItemSearchParticipants.propTypes = {
  classes: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  statuses: PropTypes.object.isRequired,
  selectedParticipants: PropTypes.array.isRequired,
  addUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  addAllUsers: PropTypes.func.isRequired,
  removeAllUsers: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionItemSearchParticipants);
