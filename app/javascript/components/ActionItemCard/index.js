import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import MUIRichTextEditor from 'mui-rte';
import NoteSharpIcon from '@material-ui/icons/NoteSharp';
import HouseIcon from '@material-ui/icons/House';
import EcoSharpIcon from '@material-ui/icons/EcoSharp';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import SentimentSatisfiedSharpIcon from '@material-ui/icons/SentimentSatisfiedSharp';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import styles from './styles';
class ActionItemCard extends React.Component {
  getIconComponent(Icon) {
    console.log(Icon);
    switch (Icon) {
      case 'HouseIcon':
        console.log('HouseIcon');
        return <HouseIcon />;
      case 'EcoSharpIcon':
        return <EcoSharpIcon />;
      case 'CreateSharpIcon':
        return <CreateSharpIcon />;
      case 'NoteSharpIcon':
        return <NoteSharpIcon />;
      case 'SentimentalSharpIcon':
        return <SentimentSatisfiedSharpIcon />;
      case 'CodeRoundedIcon':
        return <CodeRoundedIcon />;
      default:
        console.log('None of the Icons matched');
        return null;
    }
  }

  render() {
    const { classes } = this.props;
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
            <Avatar className={classes.yellow}>
              {this.getIconComponent(this.props.category)}
            </Avatar>
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
