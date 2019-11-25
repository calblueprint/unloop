import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';
import ParticipantCard from './ParticipantCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSignOutAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

var TrieSearch = require('trie-search');

class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: this.props.participants,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let participants = this.props.participants;
    let trie = new TrieSearch('name');
    trie.addAll(participants);
    this.setState({
      trie: trie,
    });
  }

  handleChange(e) {
    let searchVal = e.target.value;
    if (searchVal == '') {
      this.setState({
        participants: this.props.participants,
      });
      return;
    }
    let participants = this.state.trie.get(searchVal);
    this.setState({
      participants: participants,
    });
  }

  render() {
    let participantsList = this.state.participants.map((p, i) => {
      return <ParticipantCard key={i} participant={p}></ParticipantCard>;
    });

    return (
      <div className="dashboard">
        <div className="left-navbar">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            style={{ transform: 'rotate(180deg)' }}
            color="white"
            size="lg"
          />
          <FontAwesomeIcon icon={faHome} color="white" size="lg" />
        </div>
        <div className="content">
          <h1>Dashboard</h1>
          <div className="table-container">
            <div>
            <div className='search-bar'>
              <InputBase
                placeholder="filter participants"
                onChange={this.handleChange}
              />
              <IconButton
                type="submit"
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Participant Name</th>
                    <th>Participant Status</th>
                    <th>Actions</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{participantsList}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StaffDashboard;
