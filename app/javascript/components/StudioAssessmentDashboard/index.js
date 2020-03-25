import React from 'react';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import StudioAssessmentCard from 'components/StudioAssessmentCard';


class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        assessments: this.props.assessments,
    };
  }

  render() {
    let assessmentsList = this.state.assessments.map((p, i) => (
        <StudioAssessmentCard key={i} assessment={p}/>
      ));
    return (
      <div className="dashboard">
        <Navbar/>
        <div className="content">
          <h1>Studio Assessments</h1>
          <div className="table-container">
            <div>
            <table>
                <thead>
                    <tr>
                    <th>Participant</th>
                    <th>Big Picture</th>
                    <th>Prog Fundamentals</th>
                    <th>Version Control </th>
                    <th>React </th>
                    <th>Node </th>
                    <th>Db</th>
                    </tr>
                </thead>
                <tbody>
                   {assessmentsList}
                </tbody> 
            </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudioAssessmentDashboard.propTypes = {
  assessments: PropTypes.array,
};

export default StudioAssessmentDashboard;
