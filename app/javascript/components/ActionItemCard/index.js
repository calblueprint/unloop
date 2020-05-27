import React, { useState } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActionItemCategoryTag from 'components/ActionItemCategoryTag';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import theme from 'utils/theme';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiPatch } from 'utils/axios';
import * as Sentry from '@sentry/browser';
import formatDate from 'utils/utils';
import styles from './styles';
function ActionItemCard({
  classes,
  userType,
  title,
  description,
  dueDate,
  category,
  selected,
  renderClose,
  handleOpenModal,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  addBorderBottom,
  handleIconClick,
  removeActionItem,
  // This prop tells whether or not the assignments are being rendered from the participantShowPage
  participantShowPage,
  initialCompletedParticipant,
  initialCompletedStaff,
  assignmentId,
}) {
  const [completedParticipant, setCompletedParticipant] = useState(
    initialCompletedParticipant,
  );
  const [completedStaff, setCompletedStaff] = useState(initialCompletedStaff);

  const renderSelectIcon = () => (
    <IconButton aria-label="add" onClick={handleIconClick}>
      {selected ? <CheckCircleIcon /> : <AddIcon />}
    </IconButton>
  );

  const renderCloseIcon = () => (
    <IconButton aria-label="close" onClick={removeActionItem}>
      <CloseIcon style={{ fontSize: 'medium' }} />
    </IconButton>
  );

  const renderDeleteButton = () => (
    <Button
      size="small"
      className={classes.buttonStyle}
      onClick={removeActionItem}
    >
      DELETE
    </Button>
  );

  const renderEditButton = () => (
    <Button
      size="small"
      className={classes.buttonStyle}
      onClick={() => handleOpenModal('edit')}
    >
      EDIT
    </Button>
  );

  const renderViewMoreButton = () => (
    <Button
      size="small"
      color="primary"
      className={classes.buttonStyle}
      onClick={() => handleOpenModal('viewmore')}
    >
      VIEW MORE
    </Button>
  );

  const handleComplete = () => {
    const endpoint = '/api/assignments/complete/'.concat(assignmentId);
    apiPatch(endpoint, {})
      .then(() => {
        if (userType === 'participant') {
          setCompletedParticipant(true);
        } else {
          setCompletedStaff(true);
        }
      })
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'ActionItemCard');
          scope.setExtra('action', 'apiPatch (handleComplete)');
          scope.setExtra('assignmentId', assignmentId);
        });
        Sentry.captureException(error);
      });
    return
  };

  const renderCompleteButton = () => {
    if (participantShowPage && userType === 'participant' && !completedStaff) {
      // if user is a participant and we are on the participant show page
      return (
        <Tooltip title="Staff member must also mark assignment as completed in order to fully complete this assignment.">
          <span>
            <Button
              size="small"
              className={classes.buttonStyle}
              onClick={() => handleComplete()}
              disabled={completedParticipant}
            >
              {completedParticipant
                ? 'WAITING FOR VERIFICATION'
                : 'MARK COMPLETE'}
            </Button>
          </span>
        </Tooltip>
      );
    }
    if (participantShowPage && completedParticipant && !completedStaff) {
      // if user is a staff and we are on the participant show page
      return (
        <Tooltip title="Participant marked this as completed. Press complete to verify completion">
          <Badge color="secondary" variant="dot">
            <Button
              size="small"
              className={classes.buttonStyle}
              onClick={() => handleComplete()}
            >
              COMPLETE
            </Button>
          </Badge>
        </Tooltip>
      );
    }
  };

  // Handles logic for the first button on bottom of ActionItemCard
  const renderFirstButton = () => {
    // userType !== "participant" instead of userType === "staff" since userType is not a required prop
    if (userType !== 'participant') {
      // If render close is true, that means we're already rendering a close button elsewhere.
      // Render the edit button here instead.
      if (renderClose) {
        return renderEditButton();
      }
      return renderDeleteButton();
    }
    return null;
  };

  // Handles logic for the second button on bottom of ActionItemCard
  const renderSecondButton = () => {
    // userType !== "participant" instead of userType === "staff" since userType is not a required prop
    if (userType !== 'participant') {
      if (participantShowPage) {
        return renderEditButton();
      }
      return renderViewMoreButton();
    }
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        className={
          completedParticipant && completedStaff
            ? classes.disabledCardStyle
            : classes.cardStyle
        }
        direction="column"
        justify="space-evenly"
      >
        <Grid
          item
          container
          alignItems="center"
          justify="space-between"
          wrap="nowrap"
          spacing={2}
        >
          <Grid
            item
            container
            spacing={2}
            direction="row"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item className={classes.titleStyle}>
              <Typography variant="subtitle1" noWrap>
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <ActionItemCategoryTag category={category} selected={false} />
            </Grid>
          </Grid>
          <Grid item>{renderClose ? renderCloseIcon() : null}</Grid>
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          spacing={6}
        >
          <Grid item xs={9} className={classes.descriptionStyle}>
            <Typography variant="body1" style={{ fontSize: '14px' }}>
              {description}
            </Typography>
          </Grid>
          <Grid item>
            {participantShowPage ? (
              <FontAwesomeIcon
                onClick={() => handleOpenModal('viewmore')}
                icon={faChevronRight}
                style={{ cursor: 'pointer' }}
                className={classes.iconStyle}
              />
            ) : handleIconClick ? (
              renderSelectIcon()
            ) : null}
          </Grid>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            {dueDate ? (
              <Typography variant="body1" style={{ fontSize: '14px' }}>
                Due: {formatDate(dueDate)}
              </Typography>
            ) : null}
          </Grid>
          <Grid
            item
            container
            xs={7}
            justify="space-evenly"
            alignItems="flex-start"
          >
            {/* Make sure renderClose + participantShowPage are not both true, or else you get two edit buttons. */}
            <Grid item>{renderSecondButton()}</Grid>
            <Grid item>{renderFirstButton()}</Grid>
            <Grid item>{renderCompleteButton()}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

ActionItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  userType: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  renderClose: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  dueDate: PropTypes.string,
  handleIconClick: PropTypes.func,
  removeActionItem: PropTypes.func,
  addBorderBottom: PropTypes.bool,
  participantShowPage: PropTypes.bool,
  initialCompletedStaff: PropTypes.bool.isRequired,
  initialCompletedParticipant: PropTypes.bool.isRequired,
  assignmentId: PropTypes.number,
};

export default withStyles(styles)(ActionItemCard);
