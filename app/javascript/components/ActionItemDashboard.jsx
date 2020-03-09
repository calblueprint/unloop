import React from 'react';
//import ActionItemCard from './ActionItemCard';
import ActionItemCard from 'components/ActionItemCards';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';

let action = {
      title: "Finish Sprint",
      description: "Complete the sprint by tonight please. Thank you",
      date: new Date(),
      category: "code",
}

class ActionItemDashboard extends React.Component {
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
              <ActionItemCard actionItem = {action}></ActionItemCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActionItemDashboard.propTypes = {
  participants: PropTypes.array,
};

export default ActionItemDashboard;
