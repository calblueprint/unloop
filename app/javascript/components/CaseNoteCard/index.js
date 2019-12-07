/**
 *
 * CaseNoteCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Menu, IconButton, Grid, Paper } from '@material-ui/core/';
import MUIRichTextEditor from 'mui-rte';
import CaseNoteForm from 'components/CaseNoteForm';
import DeleteModal from 'components/DeleteModal';

import styles from './styles';

class CaseNoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.description,
      title: this.props.title,
      internal: this.props.internal,
      id: this.props.id,
      anchorEl: null,
      participantId: this.props.participantId,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose() {
    this.setState({ anchorEl: null });
  }

  renderMenuItems() {
    if (this.props.showMenu) {
      return (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleMenuClose}
            PaperProps={{
              style: {
                maxHeight: 180,
                width: 200,
              },
            }}
          >
            <CaseNoteForm
              type="edit"
              title={this.state.title}
              description={this.state.description}
              internal={this.state.internal}
              participantId={this.state.participantId}
              id={this.state.id}
            />
            <DeleteModal
              message="Are you sure you want to delete this casenote?"
              body={{
                title: this.state.title,
                description: this.state.description,
                internal: this.state.internal,
                participant_id: this.props.participantId,
              }}
              req={`/api/case_notes/${this.state.id}`}
            />
          </Menu>
        </div>
      );
    }
    return null;
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={11}>
            <Paper className={classes.casenoteCardStyle}>
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <h3>{this.state.title}</h3>
                </Grid>
                <Grid item xs={2}>
                  {this.renderMenuItems()}
                </Grid>
              </Grid>
              <div className={classes.casenoteDescStyle}>
                <MUIRichTextEditor
                  value={this.state.description}
                  readOnly
                  toolbar={false}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
}

CaseNoteCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  internal: PropTypes.bool,
  id: PropTypes.number,
  participantId: PropTypes.number,
  showMenu: PropTypes.bool,
};

export default withStyles(styles)(CaseNoteCard);
