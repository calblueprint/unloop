import React from 'react';
import PropTypes from 'prop-types';
import StudioAssessmentCard from 'components/StudioAssessmentCard';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import EnhancedTable from 'components/StudioAssessmentsEnhancedTable';

const TrieSearch = require('trie-search');

class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: this.props.assessments,
      selectedCat: 'overall',
    };
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleSort = this.handleSort.bind(this);
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



  renderDropDown() {
    const { classes } = this.props;
    const select = this.state.selectedCat;
    return (
      <FormControl>
        <InputLabel className={classes.dropDown}>Sort By Category</InputLabel>
        <Select value={select} onChange={this.handleSort} width="100">
          <MenuItem value="overall">Name</MenuItem>
          <MenuItem value="bigpictureScore">Big Picture</MenuItem>
          <MenuItem value="progfundamentalsScore">
            Programming Fundamentals
          </MenuItem>
          <MenuItem value="versioncontrolScore">Version Control</MenuItem>
          <MenuItem value="reactScore">React</MenuItem>
          <MenuItem value="nodeScore">Node</MenuItem>
          <MenuItem value="dbScore">Db</MenuItem>
          <MenuItem value="problemsolvingScore">Problem Solving</MenuItem>
          <MenuItem value="problemsolvingaltScore">
            Problem Solving Alternate
          </MenuItem>
        </Select>
      </FormControl>
    );
  }

  render() {
    const { classes } = this.props;
    const headCells = [
      {
        id: 'name',
        disablePadding: false,
        label: 'Participant',
        sortable: true,
      },
      {
        id: 'bigpictureScore',
        numeric: true,
        disablePadding: false,
        label: 'Big Picture',
        sortable: true,
      },
      {
        id: 'progfundamentalsScore',
        disablePadding: false,
        label: 'Fundamentals',
        sortable: true,
      },
      {
        id: 'versioncontrolScore',
        disablePadding: false,
        label: 'Version Control',
        sortable: true,
      },
      {
        id: 'reactScore',
        disablePadding: false,
        label: 'React',
        sortable: true,
      },
      {
        id: 'dbScore',
        disablePadding: false,
        label: 'Database',
        sortable: true,
      },
      {
        id: 'nodeScore',
        disablePadding: false,
        label: 'Node',
        sortable: true,
      },
      {
        id: 'problemsolvingScore',
        disablePadding: false,
        label: 'Problem Solving',
        sortable: true,
      },
      {
        id: 'problemsolvingaltScore',
        disablePadding: false,
        label: 'Problem Solving Alt',
        sortable: true,
      },
    ];

    console.log(this.state.assessments)

    return (
      <div className={classes.dashboard}>
        <AppBar position="static" height="80px">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Studio Assessments Dashboard
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search a name..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={this.handleSearch}
              />
            </div>
          </Toolbar>
        </AppBar>
        <EnhancedTable
          headCells={headCells}
          rows={this.state.assessments}
        ></EnhancedTable>
      </div>
    );
  }
}

StudioAssessmentDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  assessments: PropTypes.array,
};

export default withStyles(styles)(StudioAssessmentDashboard);
