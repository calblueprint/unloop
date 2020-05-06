import React from 'react';
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

function LoadModal({ classes, status, handleClick }) {
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
        titleText = 'Failed  to Assign';
        buttonText = 'TRY AGAIN';
        statusImage = errorMailbox;
        break;
      default:
        titleText = null;
        buttonText = null;
        statusImage = null;
    }
    return { titleText, buttonText, statusImage };
  };

  const { titleText, buttonText, statusImage } = getText();

  return (
    <Dialog open fullWidth classes={{ paper: classes.modalStyle }}>
      <Grid item container direction="column" alignItems="center">
        <Grid item>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography className={classes.textStyle}>{titleText}</Typography>
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
                component="span"
                variant="extended"
                size="medium"
                color="primary"
                onClick={handleClick}
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
  status: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
export default withStyles(styles)(LoadModal);
