/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import QuestionnaireModal from 'components/QuestionnaireModal';
import PaperworkList from 'components/PaperworkList';
import CaseNoteContainer from 'components/CaseNoteContainer';
import theme from 'utils/theme';
import {
  IconButton,
  Button,
  Grid,
  Typography,
  Avatar,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import UnloopLogo from 'images/unloop_logo.png';
import styles from './styles';

class ParticipantShowPage extends React.Component {
  onFormFieldChange = model => (field, value) => {
    this.setState(prevState => ({
      [model]: {
        ...prevState[model],
        [field]: value,
      },
    }));
  };

  formatDate = dateString => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dt = dateObj.getDate();
    return `${month.toString()}/${dt.toString()}/${year.toString()}`;
  };

  render() {
    const {
      classes,
      paperworks,
      caseNotes,
      participant,
      fullName,
      status,
      participantId,
      personalQuestionnaire,
      professionalQuestionnaire,
      userType,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="row"
          style={{
            height: '100vh',
            width: '100vw',
            margin: '0px',
            padding: '0px',
          }}
        >
          {/* TODO: REMOVE NAVBAR AND CREATE PARTIAL */}
          <Grid
            container
            item
            xs={1}
            style={{ height: '100%vh' }}
            className={classes.navBar}
            direction="column"
            alignItems="center"
            justify="space-between"
          >
            <Grid container item alignItems="center" direction="column">
              <Grid item>
                <Button
                  component="a"
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.navBarSignOut}
                >
                  Sign Out
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.navBarItem}
                >
                  <HomeIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item className={classes.unloopLogo}>
              <img src={UnloopLogo} alt="Unloop Logo" />
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.leftHalf}>
            <Grid container direction="column" spacing={3}>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={9}>
                  <Typography variant="h2">{fullName}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Avatar className={classes.avatarStyle}>
                    {status.toUpperCase()}
                  </Avatar>
                </Grid>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item>
                  <QuestionnaireModal
                    userType={userType}
                    questionnaireType="personal"
                    participantId={participantId}
                    questionnaire={personalQuestionnaire}
                  />
                </Grid>
                <Grid item>
                  <QuestionnaireModal
                    userType={userType}
                    questionnaireType="professional"
                    participantId={participantId}
                    questionnaire={professionalQuestionnaire}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ padding: '0px' }}>
                <PaperworkList
                  paperworks={paperworks}
                  participantId={participantId}
                  formatDate={this.formatDate}
                  userType={userType}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.rightHalf}>
            <CaseNoteContainer
              participant={participant}
              caseNotes={caseNotes}
              userType={userType}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

ParticipantShowPage.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  paperworks: PropTypes.array.isRequired,
  caseNotes: PropTypes.array.isRequired,
  participant: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participantId: PropTypes.number.isRequired,
  personalQuestionnaire: PropTypes.object.isRequired,
  professionalQuestionnaire: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParticipantShowPage);
