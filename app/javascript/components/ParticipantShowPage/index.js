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
import Navbar from 'components/Navbar';
import { Grid, Typography, Avatar } from '@material-ui/core';
import StudioAssessmentList from 'components/StudioAssessmentList';
import StudioAssessmentModal from 'components/StudioAssessmentModal';
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
      studioAssessments,
      userType,
      isAdmin,
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
          justify="space-between"
        >
          <Navbar isAdmin={isAdmin} />
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
              <Grid item style={{ padding: '0px', marginTop: '20px' }}>
                <PaperworkList
                  initialPaperworks={paperworks}
                  participantId={participantId}
                  formatDate={this.formatDate}
                  userType={userType}
                />
                <StudioAssessmentList
                  initialStudioAssessments={studioAssessments.splice(0,3)}
                  formatDate={this.formatDate}
                  userType={userType}
                  participantId={participantId}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.rightHalf}>
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
  isAdmin: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  paperworks: PropTypes.array.isRequired,
  caseNotes: PropTypes.array.isRequired,
  participant: PropTypes.object.isRequired,
  fullName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  participantId: PropTypes.number.isRequired,
  personalQuestionnaire: PropTypes.object.isRequired,
  professionalQuestionnaire: PropTypes.object.isRequired,
  studioAssessments: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParticipantShowPage);
