/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import QuestionnaireModal from 'components/QuestionnaireModal';
import PaperworkList from 'components/PaperworkList';
import CaseNoteContainer from 'components/CaseNoteContainer';
import { Grid, Typography, Avatar } from '@material-ui/core';
import StudioAssessmentList from 'components/StudioAssessmentList';
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
    } = this.props;

    return (
      <Grid
        container
        direction="row"
        style={{
          margin: '0px',
          padding: '0px',
          width: '100%',
        }}
        justify="space-between"
      >
        <Grid item className={classes.leftHalf}>
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
            <Grid
              item
              container
              direction="row"
              justify="space-evenly"
              spacing={1}
            >
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
            <Grid item>
              <PaperworkList
                initialPaperworks={paperworks}
                participantId={participantId}
                formatDate={this.formatDate}
                userType={userType}
              />
            </Grid>
            <Grid item style={{ marginTop: '20px' }}>
              <StudioAssessmentList
                initialStudioAssessments={studioAssessments}
                formatDate={this.formatDate}
                userType={userType}
                participantId={participantId}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.rightHalf}>
          <CaseNoteContainer
            participant={participant}
            caseNotes={caseNotes}
            userType={userType}
          />
        </Grid>
      </Grid>
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
  studioAssessments: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParticipantShowPage);
