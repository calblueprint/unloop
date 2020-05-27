import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EnhancedTable from 'components/EnhancedTable';
import styles from './styles';

const TrieSearch = require('trie-search');

class StudioAssessmentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assessments: this.props.assessments,
      pageNo: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    const { assessments } = this.props;
    const trie = new TrieSearch('participant_name');
    trie.addAll(assessments);
    this.setState({
      assessments,
      trie,
    });
  }

  onPageChange(e, newPage) {
    this.setState({
      pageNo: newPage,
    });
  }

  handleSearch(e) {
    const searchVal = e.target.value.trim();
    this.setState({
      pageNo: 0,
    });

    let assessments = [];
    if (searchVal === '') {
      assessments = this.props.assessments;
    } else {
      assessments = this.state.trie.get(searchVal);
    }

    this.setState({
      assessments,
      pageNo: 0,
    });
  }

  render() {
    const { classes } = this.props;
    const headCells = [
      {
        id: 'participant_name',
        disablePadding: false,
        label: 'Participant',
        sortable: true,
      },
      {
        id: 'bigpicture_score',
        numeric: true,
        disablePadding: false,
        label: 'Big Picture',
        sortable: true,
      },
      {
        id: 'progfundamentals_score',
        disablePadding: false,
        label: 'Fundamentals',
        sortable: true,
      },
      {
        id: 'versioncontrol_score',
        disablePadding: false,
        label: 'Version Control',
        sortable: true,
      },
      {
        id: 'react_score',
        disablePadding: false,
        label: 'React',
        sortable: true,
      },
      {
        id: 'db_score',
        disablePadding: false,
        label: 'Database',
        sortable: true,
      },
      {
        id: 'node_score',
        disablePadding: false,
        label: 'Node',
        sortable: true,
      },
      {
        id: 'problemsolving_score',
        disablePadding: false,
        label: 'Problem Solving',
        sortable: true,
      },
      {
        id: 'problemsolvingalt_score',
        disablePadding: false,
        label: 'Problem Solving Alt',
        sortable: true,
      },
    ];

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
          type="studio"
          pageHandler={this.onPageChange}
          page={this.state.pageNo}
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
