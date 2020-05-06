import React from 'react';
import PropTypes from 'prop-types';
import MUIRichTextEditor from 'mui-rte';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Grid,
  Paper,
  Input,
  Fab,
  Typography,
} from '@material-ui/core/';
import styles from './styles';

function ViewMoreModal({
  classes,
  description,
  title,
  category,
  dueDate,
  isCaseNote,
  open,
  handleClose,
}) {
  const renderRichText = desc => (
    <MUIRichTextEditor value={desc} readOnly toolbar={false} />
  );
  const renderReadOnlyTextField = desc => (
    <Input value={desc} readOnly disableUnderline fullWidth multiline />
  );
  const renderCategory = categorySelected => (
    <Grid item>
      <Fab
        className={classes.iconStyle}
        component="span"
        variant="extended"
        size="small"
        aria-label="category"
      >
        <Typography
          className={classes.categoryButtonStyle}
          color="primary"
          align="center"
        >
          {categorySelected.toUpperCase()}
        </Typography>
      </Fab>
    </Grid>
  );
  const renderDueDate = date => {
    if (dueDate) {
      return (
        <Grid item>
          <h4 className={classes.dateTextStyle}>Due Date: {date}</h4>
        </Grid>
      );
    }
    return null;
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
      >
        <div className={classes.backgroundColor}>
          <div className={classes.modalItems}>
            <Grid container spacing={2}>
              <Grid
                container
                justify="space-between"
                wrap="nowrap"
                alignItems="center"
                item
                xs={12}
              >
                <Grid item>
                  <h3 className={classes.titleStyle}>{title}</h3>
                </Grid>
                {isCaseNote ? null : renderCategory(category)}
              </Grid>
              {isCaseNote ? null : renderDueDate(dueDate)}
              <Grid item xs={12}>
                <Paper className={classes.caseNoteCardModalDescriptionStyle}>
                  <div className={classes.caseNoteDescStyle}>
                    {isCaseNote
                      ? renderRichText(description)
                      : renderReadOnlyTextField(description)}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </Dialog>
    </>
  );
}

ViewMoreModal.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  dueDate: PropTypes.string,
  open: PropTypes.bool.isRequired,
  isCaseNote: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ViewMoreModal);
