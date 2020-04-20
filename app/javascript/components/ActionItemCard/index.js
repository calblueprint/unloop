import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MUIRichTextEditor from 'mui-rte';
import Fab from '@material-ui/core/Fab';
import styles from './styles';
class ActionItemCard extends React.Component {
  // getIconComponent(Icon) {
  //   console.log(Icon);
  //   switch (Icon) {
  //     case 'Finances':
  //       console.log('Finances');
  //       return <HouseIcon />;
  //     case 'Project':
  //       return <EcoSharpIcon />;
  //     case 'Community':
  //       return <CreateSharpIcon />;
  //     case 'Startup':
  //       return <NoteSharpIcon />;
  //     case 'Treatment':
  //       return <SentimentSatisfiedSharpIcon />;
  //     case 'Health':
  //       return <CodeRoundedIcon />;
  //     case 'Education':
  //       return
  //     default:
  //       console.log('None of the Icons matched');
  //       return null;
  //   }
  // }

  render() {
    return (
      <Grid container spacing={3} direction="column" justify="center">
        <Grid
          item
          xs
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              title = {this.props.title}
            </Typography>
          </Grid>
          <Grid item xs>
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
                {this.props.category.toUpperCase()}
              </Typography>
            </Fab>
          </Grid>
        </Grid>
        <Grid item xs>
          <MUIRichTextEditor
            value={this.props.description}
            readOnly
            toolbar={false}
          />
        </Grid>
        <Grid
          item
          xs
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs>
            <Typography variant="body2" style={{ cursor: 'pointer' }}>
              dueDate = {this.props.dueDate}
            </Typography>
          </Grid>
          <Grid
            item
            xs
            container
            direction="row"
            justify="space-evenly"
            spacing={2}
          >
            <Button size="small" color="primary">
              DELETE
            </Button>
            <Button size="small" color="primary">
              EDIT
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
ActionItemCard.propTypes = {
  category: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  dueDate: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

ActionItemCard.defaultProps = {
  title: '',
  description: '',
  dueDate: '',
  category: '',
};

export default withStyles(styles)(ActionItemCard);
