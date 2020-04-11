import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import styles from './styles';
import ActionItemCard from 'components/ActionItemCard';

const TrieSearch = require('trie-search');

class AddFromExistingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actionItemTemplates : this.props.templates,
      categorySelected : null
    }
    this.selectCategory = this.selectCategory.bind(this);
    this.filterActionItems = this.filterActionItems.bind(this);
  }

  componentDidMount() {
    const trie = new TrieSearch('title');
    trie.addAll(this.props.templates);
    this.setState({
      trie: trie
    })
  }

  selectCategory(selectedCategory) {
    if (category == this.state.selectCategory) {
      this.setState({category: null})
    } else {
      this.setState({category: selectedCategory})
    }
  }

  filterActionItems(e) {
    const searchValue = e.target.value;
    if (searchValue == '') {
      this.setState({
        actionItemTemplates: this.props.actionItemTemplates
      })
    } else {
      this.setState(prevState => ({
        actionItemTemplates: prevState.trie.get(searchValue)
      }))
    }
  }

  render() {
    let templatesList = this.state.actionItemTemplates.filter(template => this.state.categorySelected ? 
      template.category == this.state.categorySelected
      : template)
      .map(template => (
        <ActionItemCard key={template.id} title={template.title} description={template.description} selectTemplate={this.props.selectTemplateFunc}/>
      ))

    const categoryList= this.props.categories.map(category => (
      <Grid item>
          <Fab
          // NEED TO PLACE THIS IN STYLES!!
          style={{backgroundColor: '#DCF0F2', margin: "0px 10px"}}
          component="span"
          variant="extended"
          size="small"
          disabled
          disableRipple
          disableFocusRipple
          aria-label="category"
          >
            <Typography
                className={this.props.classes.categoryButtonStyle}
                color={"primary"}
                align="center"
            >
                {category.toUpperCase()}
            </Typography>
          </Fab>
      </Grid>
    ))

    if (templatesList.length == 0) {
      templatesList = <p> No templates!</p>
    }

    return (
      <div style={{width: "502px", height: "539px"}}>
        <Paper elevation={3} className={this.props.classes.formStyle}  style={{padding: 10}}>
          <Grid container spacing={2} direction="column">
            <Grid item container direction="column" spacing={1}>
              <Grid item>
                Search by Category
              </Grid>
              <Grid item container direction="row">
                {categoryList.slice(0, 3)}
              </Grid>
              <Grid container item direction="row-reverse">
                  {categoryList.slice(3)}
              </Grid>
            </Grid>
            <Grid item container direction="column" alignItems={"stretch"}>
              <Grid item>
                <Typography> Search for assignment </Typography>
              </Grid>
              <Grid item>
                <InputBase
                  placeholder="filter participants"
                  onChange={this.filterActionItems}
                />
              </Grid>
            </Grid>
            <Grid item container alignItems="center" justify="center">
              <Grid item style={{width: '100%', padding: 0, margin: 0}}>
                <ActionItemCard 
                title={"Assignment Title"} 
                description={"Assignment description goes here"} 
                dueDate={"04/02/2020"}
                category={"Treatment"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }


}

AddFromExistingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  templates: PropTypes.array.isRequired,
};

export default withStyles(styles)(AddFromExistingForm);
