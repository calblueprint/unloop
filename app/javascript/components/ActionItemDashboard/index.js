import React from 'react';
import ActionItemCard from 'components/ActionItemCards';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';

const action = {
  title: 'Finish Sprint',
  description: 'Complete the sprint by tonight please. Thank you',
  date: new Date(),
  category: 'code',
};

class ActionItemDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: this.props.assignments,
    };
  }

  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="content">
          <h1>Assignment Dashboard</h1>
          <div className="table-container">
            <div>
              <ActionItemCard actionItem={action} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ActionItemDashboard.propTypes = {
  assignments: PropTypes.array,
};

export default ActionItemDashboard;
