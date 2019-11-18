import React from 'react';
import PropTypes from 'prop-types';
import ParticipantCard from './ParticipantCard';

const styles = {
  table: {
    // width: 'calc(100% - 40px)',
    // margin: '20px',
    // display: 'flex',
    // flexDirection: 'row',
    // borderBottom: "2px solid #000000",
    // textAlign: 'left',
    // boxShadow: "-5px 0px 5px 0px #000000"
  },
  dashboard: {
    width: '100%',
    margin: '80px',
  },
};

class StaffDashboard extends React.Component {
  render() {
    let pNames = this.props.participant_names;
    let participants = this.props.participants;
    let participantsList = participants.map((p, i) => {
      return (
        <ParticipantCard
          key={i}
          participant={p}
          name={pNames[i]}
        ></ParticipantCard>
      );
    });

    return (
      <div className="dashboard">
        <div className="left-navbar"></div>
        <div className="content">
          <h1>Dashboard</h1>
          <div className="table-container">
            <table style={styles.table}>
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
    );
  }
}

export default StaffDashboard;
