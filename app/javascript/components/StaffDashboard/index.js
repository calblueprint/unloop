import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EnhancedTable from 'components/EnhancedTable';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import styles from './styles';

const TrieSearch = require('trie-search');

class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { participants } = this.props;
    const trie = new TrieSearch('name');
    trie.addAll(participants);
    this.setState({
      trie,
    });
  }

  handleChange(e) {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      this.setState({
        participants: this.props.participants,
      });
      return;
    }
    const participants = this.state.trie.get(searchVal);
    this.setState({
      participants,
    });
  }

  render() {
    const { classes } = this.props;
    const headCells = [
      {
        id: 'name',
        disablePadding: false,
        label: 'Participant',
        sortable: true,
      },
      {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        sortable: true,
      },
      {
        id: 'paperworksCompleted',
        disablePadding: false,
        label: 'Paperwork',
        sortable: true,
      },
      {
        id: 'caseNotesCount',
        disablePadding: false,
        label: 'Casenotes',
        sortable: true,
      },
      {
        id: 'form_status',
        disablePadding: false,
        label: 'Form Status',
        sortable: false,
      },
      {
        id: 'next_arrow',
        label: ' ',
        sortable: false,
      },
    ];

    return (
      <div>
        <AppBar position="static" height="80px">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Participant Dashboard
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search a name..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.handleChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <EnhancedTable
          headCells={headCells}
          rows={this.state.participants}
        ></EnhancedTable>
      </div>
    );
  }
}

StaffDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  participants: PropTypes.array,
};

export default withStyles(styles)(StaffDashboard);
