import React from 'react';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import StudioAssessmentCard from 'components/StudioAssessmentCard';
import styles from './styles';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from 'utils/theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        assessments: this.props.assessments,
        selectedCat: "overall",
    };
  }

  handleDropdown = (event) => {
    this.setState({
      selectedCat: event.target.value,
    });
  }

  renderDropDown(){
    const { classes } = this.props;
    let select = this.state.selectedCat;
    return(
      <FormControl>
      <InputLabel className={classes.dropDown}>Sort By</InputLabel>
      <Select
        value={select}
        onChange = {this.handleDropdown}
      >
        <MenuItem value = {"overall"}>Overall Rankings  </MenuItem>
        <MenuItem value = {"bigPic"}>Big Picture       </MenuItem>
        <MenuItem value = {"progFun"}>Prog Fundamentals </MenuItem>
        <MenuItem value = {"verCon"}>Version Control   </MenuItem>
        <MenuItem value = {"react"}>React             </MenuItem>
        <MenuItem value = {"node"}>Node              </MenuItem>
        <MenuItem value = {"Db"}>Db                </MenuItem>
        <MenuItem value = {"probSol"}>Prob Solve        </MenuItem>
        <MenuItem value = {"probAlt"}>Prob Solve Alt    </MenuItem>
      </Select>
    </FormControl>
    );
  }

  render() {
    const { classes } = this.props;
    let assessmentsList = this.state.assessments.map((p, i) => (
        <StudioAssessmentCard key={i} assessment={p}/>
      ));

    return (
      <ThemeProvider theme = {theme}>
      <div className= {classes.dashboard}>
      <Navbar isAdmin={this.props.isAdmin} />
        <div className= {classes.content}>
          <h1>Studio Assessments</h1>
          <div className= {classes.tableContainer}>
            <div>
            <table>
                <thead>
                    <tr>
                    <th>{this.renderDropDown()}</th>
                    <th>Big Picture</th>
                    <th>Prog Fundamentals</th>
                    <th>Version Control </th>
                    <th>React </th>
                    <th>Node </th>
                    <th>Db</th>
                    <th>Prob Solve </th>
                    <th>Prob Solve Alt </th>
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
      </ThemeProvider>
    );
  }
}

StudioAssessmentDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  assessments: PropTypes.array,
};

export default withStyles(styles)(StudioAssessmentDashboard);
