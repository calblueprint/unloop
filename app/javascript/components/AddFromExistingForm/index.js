import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ActionItemCard from 'components/ActionItemCard';
import PropTypes from 'prop-types';
s
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

        const categoryList = this.props.categories.map(category => (
            <Grid item>
                {category}
            </Grid>
        ))

        if (templatesList.length == 0) {
            templatesList = <p> No templates!</p>
        }

        return (
            <Paper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item container xs={2}>
                        <Grid item>

                        </Grid>
                        {categoryList}
                    </Grid>
                    <Grid item container xs={1}>
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
                    <Grid item container>
                        <Grid item>
                            {templatesList.map(template => (
                                <Grid item>
                                    {template}
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }


}

AddFromExistingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  template: PropTypes.array.isRequired,
};

export default ActionItemSearchParticipants;
