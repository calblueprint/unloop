import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import ParticipantCard from './ParticipantCard';
import NavBar from 'components/Navbar';
import PropTypes from 'prop-types';

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
    let participantsList = this.state.participants.map((p, i) => (
      <ParticipantCard key={i} participant={p}></ParticipantCard>
    ));

    if (this.state.participants.length == 0) {
      participantsList = <p>There are no participants to show.</p>;
    }

    return (
      <div className="dashboard">
        <NavBar></NavBar>
        <div className="content">
          <h1>Participant Dashboard</h1>
          <div className="table-container">
            <div>
              <div className="search-bar">
                <InputBase
                  placeholder="filter participants"
                  onChange={this.handleChange}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>PARTICIPANT</th>
                    <th>STATUS</th>
                    <th>PAPERWORK</th>
                    <th>CASE NOTES</th>
                    <th>FORM STATUS</th>
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

StaffDashboard.propTypes = {
  participants: PropTypes.array,
};

export default StaffDashboard;
