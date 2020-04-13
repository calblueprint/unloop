import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import ActionItemCard from 'components/ActionItemCard';
import styles from './styles';

const TrieSearch = require('trie-search');

class AddFromExistingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionItemTemplates: this.props.templates,
      categorySelected: null,
    };
    this.selectCategory = this.selectCategory.bind(this);
    this.filterActionItems = this.filterActionItems.bind(this);
  }

  componentDidMount() {
    const trie = new TrieSearch('title');
    trie.addAll(this.props.templates);
    this.setState({
      trie,
    });
  }

  selectCategory(selectedCategory) {
    if (category == this.state.selectCategory) {
      this.setState({ category: null });
    } else {
      this.setState({ category: selectedCategory });
    }
  }

  filterActionItems(e) {
    const searchValue = e.target.value;
    if (searchValue === '') {
      this.setState({
        actionItemTemplates: this.props.actionItemTemplates,
      });
      return;
    }

    this.setState(prevState => ({
      actionItemTemplates: prevState.trie.get(searchValue),
    }));
  }

  render() {
    let templatesList = this.state.actionItemTemplates
      .filter(template =>
        this.state.categorySelected
          ? template.category == this.state.categorySelected
          : template,
      )
      .map(template => (
        <ListItem style={{ margin: 0 }}>
          <ActionItemCard
            key={template.id}
            title={template.title}
            description={template.description}
            selectTemplate={this.props.selectTemplateFunc}
            category="Finances"
          />
        </ListItem>
      ));
    const categories = [
      'Finances',
      'Project',
      'Community',
      'Startup',
      'Treatment',
      'Health',
      'Education',
    ];
    const categoryList = categories.map(category => (
      <Grid item>
        <Fab
          className={this.props.classes.iconStyle}
          component="span"
          variant="extended"
          size="small"
          aria-label="category"
        >
          <Typography
            className={this.props.classes.categoryButtonStyle}
            color="primary"
            align="center"
          >
            {category.toUpperCase()}
          </Typography>
        </Fab>
      </Grid>
    ));

    if (templatesList.length == 0) {
      templatesList = <p> No templates!</p>;
    }

    return (
      <Paper
        elevation={3}
        className={this.props.classes.formStyle}
        style={{ padding: 10 }}
      >
        <Grid container spacing={3} direction="column">
          <Grid item container direction="column" spacing={2}>
            <Grid item>SEARCH BY CATEGORY</Grid>
            <Grid item container direction="row" justify="space-evenly">
              {categoryList.slice(0, 4)}
            </Grid>
            <Grid
              container
              item
              justify="center"
              spacing={3}
              direction="row-reverse"
            >
              {categoryList.slice(4)}
            </Grid>
          </Grid>
          <Grid item container direction="column" alignItems="stretch">
            <Grid item>
              <div>SEARCH FOR ASSIGNMENT</div>
              <TextField
                className={this.props.classes.searchBar}
                onChange={this.filterActionItems}
                variant="outlined"
                type="text"
                margin="dense"
              />
            </Grid>
          </Grid>
          <List
            dense
            style={{
              overflow: 'auto',
              width: '100%',
              position: 'relative',
              maxHeight: '600px',
              height: '50vh',
              minHeight: '400px',
            }}
          >
            {templatesList.slice(0, 4)}
          </List>
        </Grid>
      </Paper>
    );
  }
}

AddFromExistingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  templates: PropTypes.array.isRequired,
};

export default withStyles(styles)(AddFromExistingForm);
