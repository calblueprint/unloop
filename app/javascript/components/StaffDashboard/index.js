import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import theme from 'utils/theme';
import ParticipantCard from 'components/ParticipantCard';
import Navbar from 'components/Navbar';
import EnhancedTable from 'components/EnhancedTable';
import PropTypes from 'prop-types';
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
    const searchVal = e.target.value;
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
    const headCells = [
      {
        id: 'participant',
        numeric: false,
        disablePadding: true,
        label: 'Participant',
      },
      { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
      {
        id: 'paperwork',
        numeric: true,
        disablePadding: false,
        label: 'Paperwork',
      },
      {
        id: 'casenotes',
        numeric: true,
        disablePadding: false,
        label: 'Casenotes',
      },
      {
        id: 'form_status',
        numeric: true,
        disablePadding: false,
        label: 'Form Status',
      },
    ];

    let rows = [];
    rows = this.state.participants.map(p => ({
      participant: p.name,
      status: p.status,
      paperwork: p.paperworksCount,
      casenotes: p.caseNotesCount,
      form_status: p.questionnaireStatus,
    }));

    console.log(rows);
    return <EnhancedTable headCells={headCells} rows={rows}></EnhancedTable>;
  }
}

StaffDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  participants: PropTypes.array,
  isAdmin: PropTypes.bool.isRequired,
};

export default withStyles(styles)(StaffDashboard);
