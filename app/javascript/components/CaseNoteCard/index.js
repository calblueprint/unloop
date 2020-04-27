/**
 *
 * CaseNoteCard
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Menu, IconButton, Grid, Paper } from '@material-ui/core/';
import MUIRichTextEditor from 'mui-rte';
import CaseNoteForm from 'components/CaseNoteForm';
import DeleteModal from 'components/DeleteModal';
import CaseNoteCardModal from 'components/CaseNoteCardModal';
import styles from './styles';

function CaseNoteCard({
  classes,
  description,
  title,
  visible,
  caseNoteId,
  participantId,
  showMenu,
  updateCaseNote,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const renderMenuItems = () => (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            maxHeight: 180,
            width: 200,
          },
        }}
      >
        <CaseNoteForm
          type="edit"
          title={title}
          description={description}
          visible={visible}
          participantId={participantId}
          caseNoteId={caseNoteId}
          updateCaseNote={updateCaseNote}
        />
        <DeleteModal
          message="Are you sure you want to delete this casenote?"
          body={{
            title,
            description,
            visible,
            participant_id: participantId,
          }}
          req={`/api/case_notes/${caseNoteId}`}
        />
      </Menu>
    </div>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={11}>
        <Paper className={classes.caseNoteCardStyle}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <h3 className={classes.casenoteCardTitleStyle}>{title}</h3>
            </Grid>
            <Grid item xs={2}>
              {showMenu ? renderMenuItems() : null}
            </Grid>
          </Grid>
          <div className={classes.caseNoteDescStyle}>
            <MUIRichTextEditor value={description} readOnly toolbar={false} />
          </div>

          <Grid container spacing={2} className={classes.buttonStyle}>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}>
              <CaseNoteCardModal description={description} title={title} />
              {/* <ActionItemModal
              description ={this.state.description}
              title = {this.state.title} */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

CaseNoteCard.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  visible: PropTypes.bool,
  caseNoteId: PropTypes.number.isRequired,
  participantId: PropTypes.number,
  showMenu: PropTypes.bool,
  updateCaseNote: PropTypes.func,
};

export default withStyles(styles)(CaseNoteCard);
