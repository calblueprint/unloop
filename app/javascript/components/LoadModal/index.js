import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import errorMailbox from 'images/error_mailbox';
import loadMail from 'images/load_mail';
import successMailbox from 'images/success_mailbox';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  Typography,
  Grid,
} from '@material-ui/core';
import styles from './styles';

function LoadModal({
  classes,
  open,
  status,
  handleClick,
  handleClose,
  errorCount,
}) {
  const getText = () => {
    let titleText;
    let buttonText;
    let statusImage;
    switch (status) {
      case 'loading':
        titleText = 'Assigning...';
        buttonText = null;
        statusImage = loadMail;
        break;
      case 'complete':
        titleText = 'Successfully Assigned!';
        buttonText = 'CREATE NEW';
        statusImage = successMailbox;
        break;
      case 'error':
        titleText = `Failed to assign ${errorCount} assignments`;
        buttonText = 'VIEW FAILED ASSIGNMENTS';
        statusImage = errorMailbox;
        break;
      default:
        titleText = null;
        buttonText = null;
        statusImage = null;
    }
    return { titleText, buttonText, statusImage };
  };

  const buttonRef = useRef(null);
  const { titleText, buttonText, statusImage } = getText();

  useEffect(() => {
    if (buttonText && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, [status]);

  return (
    <Dialog
      open={open}
      fullWidth
      classes={{ paper: classes.modalStyle }}
      onClose={handleClose}
      onExited={() =>
        // Avoid blurring document.body on IE9 since it blurs the entire window
        document.activeElement !== document.body
          ? document.activeElement.blur()
          : null
      }
    >
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {titleText}
            </DialogContentText>
          </DialogContent>
        </Grid>
        <Grid item>
          <DialogContent>
            <img src={statusImage} alt={titleText} />
          </DialogContent>
        </Grid>

        <Grid item>
          <DialogActions>
            {buttonText ? (
              <Fab
                className={classes.iconStyle}
                ref={buttonRef}
                component="span"
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleClick}
                disableRipple
              >
                <Typography
                  className={classes.categoryButtonStyle}
                  align="center"
                >
                  {buttonText}
                </Typography>
              </Fab>
            ) : null}
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
}

LoadModal.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  errorCount: PropTypes.number,
};
export default withStyles(styles)(LoadModal);
