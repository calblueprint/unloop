import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import ActionItemCard from 'components/ActionItemCard';
import theme from 'utils/theme';
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

  selectCategory(categorySelected) {
    if (categorySelected === this.state.categorySelected) {
      this.setState({ categorySelected: null });
    } else {
      this.setState({ categorySelected });
    }
  }

  filterActionItems(e) {
    const searchValue = e.target.value;
    if (searchValue === '') {
      this.setState({
        actionItemTemplates: this.props.templates,
      });
      return;
    }

    this.setState(prevState => ({
      actionItemTemplates: prevState.trie.get(searchValue),
    }));
  }

  render() {
    const { classes } = this.props

    let filteredTemplates = this.state.actionItemTemplates.filter(template =>
      this.state.categorySelected
        ? template.category.toUpperCase() === this.state.categorySelected
        : template,
    );

    filteredTemplates = filteredTemplates.map((template, i) => (
      <ListItem>
        <ActionItemCard
          key={template.id}
          title={template.title}
          description={template.description}
          category={template.category}
          lastEntry={filteredTemplates.length - 1 === i}
          selectCardFunc={() => {
            console.log('Will change!'); // Placeholder since function will be passed down from parent
          }}
        />
      </ListItem>
    ));
    const categories = [
      'FINANCES',
      'PROJECT',
      'COMMUNITY',
      'STARTUP',
      'TREATMENT',
      'HEALTH',
      'EDUCATION',
    ];
    const categoryList = categories.map(category => {
      const isSelectedCategory =
        this.state.categorySelected && this.state.categorySelected === category;
      return (
        <Grid item>
          <Fab
            className={classes.iconStyle}
            style={{
              backgroundColor: isSelectedCategory
                ? theme.palette.primary.main
                : theme.palette.common.lighterBlue,
            }}
            component="span"
            variant="extended"
            size="small"
            aria-label="category"
            onClick={() => this.selectCategory(category)} //TODO: Replace this with this.props.selectCardFunc when 
          >
            <Typography
              className={classes.categoryButtonStyle}
              style={{
                color: isSelectedCategory
                  ? theme.palette.common.lighterBlue
                  : theme.palette.primary.main,
              }}
              align="center"
            >
              {category.toUpperCase()}
            </Typography>
          </Fab>
        </Grid>
      );
    });

    return (
      <ThemeProvider theme={theme}>
        <Paper
          elevation={3}
          className={classes.formStyle}
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
                  className={classes.searchBar}
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
                maxHeight: '600px',
                height: '50vh',
                minHeight: '400px',
              }}
            >
              {filteredTemplates.length !== 0 ? (
                filteredTemplates
              ) : (
                <ListItem className={classes.noActionItemsDisplay}>
                  <Typography variant="h5"> No templates! </Typography>
                </ListItem>
              )}
            </List>
          </Grid>
        </Paper>
      </ThemeProvider>
    );
  }
}

AddFromExistingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  selectCardFunc: PropTypes.func,
};

export default withStyles(styles)(AddFromExistingForm);
