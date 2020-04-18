import React from 'react';
import Navbar from 'components/Navbar';
import PropTypes from 'prop-types';
import StudioAssessmentCard from 'components/StudioAssessmentCard';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from 'utils/theme';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import styles from './styles';

const TrieSearch = require('trie-search');

class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: this.props.assessments,
      selectedCat: "overall",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const { assessments } = this.props;
    const trie = new TrieSearch('name');
    trie.addAll(assessments);
    assessments.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.setState({
      assessments,
      trie,
    });
  }

  handleSearch(e) {
    const searchVal = e.target.value.trim();

    const category = this.state.selectedCat;
    let assessments = [];
    if (searchVal === '') {
      assessments = this.props.assessments;
    } else {
      assessments = this.state.trie.get(searchVal);
    }
    assessments.sort((a, b) => this.getComparator(a, b, category));

    this.setState({
      assessments,
    });
  }

  handleSort = event => {
    const category = event.target.value;
    const currAssessments = this.state.assessments;
    if (category === 'overall') {
      currAssessments.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      currAssessments.sort((a, b) => this.getComparator(a, b, category));
    }
    this.setState({
      assessments: currAssessments,
      selectedCat: category,
    });
  };

  getComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  renderDropDown() {
    const { classes } = this.props;
    const select = this.state.selectedCat;
    return (
      <FormControl>
        <InputLabel className={classes.dropDown}>Sort By Score Categories</InputLabel>
        <Select
          value={select}
          onChange = {this.handleSort}
        >
          <MenuItem value = "overall">Overall Rankings  </MenuItem>
          <MenuItem value = "bigpictureScore">Big Picture       </MenuItem>
          <MenuItem value = "progfundamentalsScore">Programming Fundamentals </MenuItem>
          <MenuItem value = "versioncontrolScore">Version Control   </MenuItem>
          <MenuItem value = "reactScore">React             </MenuItem>
          <MenuItem value = "nodeScore">Node              </MenuItem>
          <MenuItem value = "dbScore">Db                </MenuItem>
          <MenuItem value = "problemsolvingScore">Problem Solving        </MenuItem>
          <MenuItem value = "problemsolvingaltScore">Problem Solving Alternate   </MenuItem>
        </Select>
      </FormControl>
    );
  }

  render() {
    const { classes } = this.props;
    const assessmentsList = this.state.assessments.map((p, i) => (
      <StudioAssessmentCard key={i} assessment={p} selectedCat = {this.state.selectedCat}/>
    ));

    return (
      <ThemeProvider theme={theme}>
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
                      <th>
                        <button 
                          value = "bigpictureScore" onClick = {this.handleSort} >
                          Big Picture
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "progfundamentalsScore" onClick = {this.handleSort} >
                          Programming Fundamentals
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "versioncontrolScore" onClick = {this.handleSort} >
                          Version Control
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "reactScore" onClick = {this.handleSort} >
                          React
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "nodeScore" onClick = {this.handleSort} >
                          Node
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "dbScore" onClick = {this.handleSort} >
                          DB
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "problemsolvingScore" onClick = {this.handleSort} >
                          Problem Solving
                        </button>
                      </th>
                      <th>
                        <button 
                          value = "problemsolvingaltScore" onClick = {this.handleSort} >
                          Problem Solving Alternate
                        </button>
                      </th>
                      <th>
                        <button  >
                      Date
                        </button>
                      </th>
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
