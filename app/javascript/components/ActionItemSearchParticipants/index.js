import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  InputBase,
  Fab,
  Box,
  Divider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import theme from '../../utils/theme';
import ActionItemParticipant from '../ActionItemParticipant';
import { apiGet } from '../../utils/axios';
import styles from './styles';

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
      statuses: [],
      selectedStatus: null,
      participantAttrs: {},
      searchValue: '',
    };
    this.filterByName = this.filterByName.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
    this.allSelect = this.allSelect.bind(this);

    // The following dictionary keeps track of each participants to see if they've been selected or not (by the checkmark),
    // and whether not they should be visible, depending on which category and search are input to filter the participants on.
    this.state.participants.forEach(p => {
      this.state.participantAttrs[p.id] = {
        selected: false,
        searchTrue: true,
        categoryTrue: true,
      };
    });

    // Putting all the different existing categories in state via back-end request.
    this.fetchCategories();
  }

  async fetchCategories() {
    const promise = apiGet('api/participants/statuses');
    promise.then(p => {
      this.setState({
        statuses: p.data,
      });
    });
  }

  // Load in all the different participants from a 'TrieSearch' by name
  componentDidMount() {
    const trie = new TrieSearch('name');
    trie.addAll(this.state.participants);
    this.setState({
      trie,
    });
  }

  // For searching the different participants
  // Can only be rendered if found in the Trie AND is appropriate category (category is first filter, name is second)
  filterByName(e) {
    const searchVal = e.target.value;
    this.setState({
      searchValue: searchVal,
    });

    // Find filtered participants via Trie
    let filterTemp;
    if (searchVal === '') {
      filterTemp = this.state.participants;
    } else {
      filterTemp = this.state.trie.get(searchVal);
    }

    // Make set of participants from filterTemp
    const filterParticipants = new Set();
    filterTemp.forEach(p => {
      filterParticipants.add(p.id);
    });

    // Filter through participantAttrs, and only set searchTrue to the ones that exist in filterTemp.
    this.state.participants.forEach(p => {
      this.state.participantAttrs[p.id].searchTrue = filterParticipants.has(
        p.id,
      );
    });
  }

  filterByStatus(status) {
    // 1. You click a filter, either a different one or for the first time.
    // 2. You click the same filter, rendering everyone again.

    // 1
    if (this.state.selectedStatus !== status) {
      this.state.participants.forEach(p => {
        this.state.participantAttrs[p.id].categoryTrue = p.status === status;
      });
      // 2
    } else {
      this.state.participants.forEach(p => {
        this.state.participantAttrs[p.id].categoryTrue = true;
      });
      this.state.selectedStatus = null;
    }

    this.setState({
      selectedStatus: status,
    });
  }

  // Change the state for one of the child components when the 'plus' button is toggled and passes this info to parent class.
  changeChecked(user) {
    const newVal = !this.state.participantAttrs[user.id].selected;
    this.state.participantAttrs[user.id].selected = newVal;

    if (newVal) {
      this.props.addUser(user);
    } else {
      this.props.removeUser(user);
    }
  }

  // For selecting or de-selecting all participants
  allSelect(e) {
    this.props.participants.forEach(p => {
      this.state.participantAttrs[p.id].selected = e.target.checked;
    });
    if (e.target.checked) {
      this.props.addAllUsers();
    } else {
      this.props.removeAllUsers();
    }
  }

  // Creates and returns the status buttons
  statusButtons() {
    return Object.keys(this.state.statuses).map(status => {
      const importedStyles = styles().statusButton;
      importedStyles.backgroundColor = theme.palette.buttons[status];
      return (
        <Fab style={importedStyles} onClick={() => this.filterByStatus(status)}>
          {status}
        </Fab>
      );
    });
  }

  render() {
    const { classes } = this.props;

    //     this.props.comments
    //   .filter(commentReply => commentReply.replyTo === comment.id)
    //   .map((commentReply, idx) => <CommentItem key={idx} className="SubComment"/>);

    const participantCards = this.state.participants.map(p => {
      // Must have currently selected category and search
      const currP = this.state.participantAttrs[p.id];
      if (currP.categoryTrue && currP.searchTrue) {
        return (
          <ActionItemParticipant
            participant={p}
            checked={currP.selected}
            changeChecked={this.changeChecked}
          />
        );
      }
      return null;
    });

    return (
      <div className="searchParticipant">
        {/* For the top 'ADD STUDENTS' Bar */}
        <div className="topBar" style={{ color: '#5870EB' }}>
          Add Students
          <Box className={classes.boxProps} />
          <Divider />
        </div>

        <div className="outerRectangle">
          <Box className={classes.boundaryBox}>
            {/* Filter By Category */}
            <div className="categories">
              FILTER BY CATEGORY
              <div>{this.statusButtons()}</div>
            </div>

            {/* Search for an individual */}
            <div className={classes.searchIndividual}>
              SEARCH FOR INDIVIDUAL
              <InputBase
                className={classes.searchBar}
                onChange={this.filterByName}
                value={this.state.searchValue}
              />
            </div>

            {/* List all the participant cards in scrolling fashion */}
            <div className={classes.searchScroll}>
              <div className="listIndividuals">{participantCards}</div>
            </div>

            {/* Select All Button */}
            <FormControlLabel
              className={classes.selectAll}
              control={<Checkbox color="default" onClick={this.allSelect} />}
              label="SELECT ALL"
            />
          </Box>
        </div>
      </div>
    );
  }
}

ActionItemSearchParticipants.propTypes = {
  participants: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  addUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  addAllUsers: PropTypes.func.isRequired,
  removeAllUsers: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionItemSearchParticipants);
