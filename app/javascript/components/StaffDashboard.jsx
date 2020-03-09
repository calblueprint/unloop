import React from 'react';
import ParticipantCard from './ParticipantCard';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';

let action = {
      title: "Finish Sprint",
      description: "Complete the sprint by tonight please. Thank you",
      due: new Date(),
      category: "code",
}

class StaffDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: this.props.assignments,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
   
  }

  handleChange(e) {
  
  }

  render() {
    // let participantsList = this.state.participants.map((p, i) => (
    //   <ParticipantCard key={i} actionItem={p}></ParticipantCard>
    // ));

    // if (this.state.participants.length == 0) {
    //   participantsList = <p>There are no participants to show.</p>;
    // }

    return (
      <div className="dashboard">
        <Navbar></Navbar>
        <div className="content">
          <h1>Assignment Dashboard</h1>
          <div className="table-container">
            <div >
              <ParticipantCard actionItem = {action}></ParticipantCard>
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
