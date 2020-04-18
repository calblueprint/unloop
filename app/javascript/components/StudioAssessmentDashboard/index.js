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
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';

const TrieSearch = require('trie-search');


class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        assessments: this.props.assessments,
        selectedCat: "overall",
    };
    this.handleSearch = this.handleSearch.bind(this);

  }

  componentDidMount() {
    const { assessments } = this.props;
    const trie = new TrieSearch('name');
    trie.addAll(assessments);
    assessments.sort((a, b) => (a.name > b.name) ? 1 : -1);
    this.setState({
      assessments: assessments,
      trie,
    });
  }

  handleSearch(e) {
    const searchVal = e.target.value;
    if (searchVal === '') {
      this.setState({
        assessments: this.props.assessments,
      });
      return;
    }
    const assessments = this.state.trie.get(searchVal);
    this.setState({
      assessments,
    });
  }

  handleDropdown = (event) => {
    const category = event.target.value;
    let currAssessments = this.props.assessments;
    if(category === "overall"){
      currAssessments.sort((a, b) => (a.name > b.name) ? 1 : -1);
    } else {
      currAssessments.sort((a,b) => this.getComparator(a,b, category));

    }
    this.setState({
      assessments: currAssessments,
      selectedCat: category,
    });
  }

  getComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // const { assessment } = this.props;
  //   const bigPic = assessment.bigpictureScore;
  //   const prog = assessment.progfundamentalsScore;
  //   const vc = assessment.versioncontrolScore;
  //   const react = assessment.reactScore;
  //   const node = assessment.nodeScore;
  //   const db = assessment.dbScore;
  //   const probSolve = assessment.problemsolvingScore;
  //   const probSolveAlt = assessment.problemsolvingaltScore;
  //   const { classes } = this.props;
  //   const currCategory = this.props.selectedCat;

  renderDropDown(){
    const { classes } = this.props;
    let select = this.state.selectedCat;
    return(
      <FormControl>
      <InputLabel className={classes.dropDown}>Sort By Score Categories</InputLabel>
      <Select
        value={select}
        onChange = {this.handleDropdown}
      >
        <MenuItem value = {"overall"}>Overall Rankings  </MenuItem>
        <MenuItem value = {"bigpictureScore"}>Big Picture       </MenuItem>
        <MenuItem value = {"progfundamentalsScore"}>Programming Fundamentals </MenuItem>
        <MenuItem value = {"verversioncontrolScoreCon"}>Version Control   </MenuItem>
        <MenuItem value = {"reareactScorect"}>React             </MenuItem>
        <MenuItem value = {"nodeScore"}>Node              </MenuItem>
        <MenuItem value = {"dbScore"}>Db                </MenuItem>
        <MenuItem value = {"problemsolvingScore"}>Problem Solving        </MenuItem>
        <MenuItem value = {"proproblemsolvingaltScorebAlt"}>Problem Solving Alternate   </MenuItem>
      </Select>
    </FormControl>
    );
  }

  render() {
    const { classes } = this.props;
    let assessmentsList = this.state.assessments.map((p, i) => (
        <StudioAssessmentCard key={i} assessment={p} selectedCat = {this.state.selectedCat}/>
      ));

    return (
      <ThemeProvider theme = {theme}>
      <div className= {classes.dashboard}>
      <Navbar isAdmin={this.props.isAdmin} />
        <div className= {classes.content}>
          <h1>Studio Assessments</h1>
          <div className= {classes.tableContainer}>

            <div>
            <div className={classes.searchBar}>
                  <InputBase
                    placeholder="search assessments"
                    onChange={this.handleSearch}
                  />
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </div>
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
