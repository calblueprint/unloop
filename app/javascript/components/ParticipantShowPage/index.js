/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import PaperworkList from 'components/PaperworkList';
import AssignmentList from 'components/AssignmentList';
import StudioAssessmentList from 'components/StudioAssessmentList';
import QuestionnaireModal from 'components/QuestionnaireModal';
import CaseNoteContainer from 'components/CaseNoteContainer';
import { Grid, Typography, Avatar } from '@material-ui/core';
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
    const dt = dateObj.getDate() + 1;
    return `${month.toString()}/${dt.toString()}/${year.toString()}`;
  };

  render() {
    const {
      userType,
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
      assignmentList,
      resumeURL,
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
                <Typography variant="h3">{fullName}</Typography>
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
              justify="flex-start"
              spacing={1}
            >
              <Grid item>
                <QuestionnaireModal
                  userType={userType}
                  questionnaireType="personal"
                  participantId={participantId}
                  questionnaire={personalQuestionnaire}
                  resumeURL={resumeURL}
                />
              </Grid>
              <Grid item>
                <QuestionnaireModal
                  userType={userType}
                  questionnaireType="professional"
                  participantId={participantId}
                  questionnaire={professionalQuestionnaire}
                  resumeURL={resumeURL}
                />
              </Grid>
            </Grid>
            <Grid item>
              {/* These are paperworks */}
              <PaperworkList
                initialPaperworks={paperworks}
                participantId={participantId}
                formatDate={this.formatDate}
                userType={userType}
              />
            </Grid>
            <Grid item style={{ padding: '0px', marginTop: '20px' }}>
              {/* These are casenotes */}
              <CaseNoteContainer
                participant={participant}
                caseNotes={caseNotes}
                userType={userType}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.rightHalf}>
          <AssignmentList
            userType={userType}
            initialAssignments={assignmentList}
            participantId={participantId}
            formatDate={this.formatDate}
          />
          {userType === 'staff' ? (
            <StudioAssessmentList
              initialStudioAssessments={studioAssessments}
              formatDate={this.formatDate}
              userType={userType}
              participantId={participantId}
            />
          ) : null}
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
  studioAssessments: PropTypes.array.isRequired,
  resumeURL: PropTypes.string.isRequired,
  assignmentList: PropTypes.array,
};

export default withStyles(styles)(ParticipantShowPage);
