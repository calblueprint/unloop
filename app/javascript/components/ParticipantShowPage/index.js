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
import AssignmentList from 'components/AssignmentList';
import StudioAssessmentList from 'components/StudioAssessmentList';
import CaseNoteContainer from 'components/CaseNoteContainer';
import theme from 'utils/theme';
import Navbar from 'components/Navbar';
import { Grid, Typography, Avatar } from '@material-ui/core';
import ActionItemCard from 'components/ActionItemCard';
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
      assignments,
    } = this.props;

    console.log("case notes", caseNotes);
    console.log("paperworks", paperworks);
    console.log("assignments", assignments);
    console.log("participantId", participantId);
    console.log("studio assessments", studioAssessments[0]);
    
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
                {/* These are caseNotes */}
                <CaseNoteContainer
                  participant={participant}
                  caseNotes={caseNotes}
                  userType={userType}
                />
              </Grid>
              <Grid item style={{ padding: '0px', marginTop: '20px' }}>
                {/* These are paperwork lists */}
                <PaperworkList
                  initialPaperworks={paperworks}
                  participantId={participantId}
                  formatDate={this.formatDate}
                  userType={userType}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.rightHalf}>
            <Grid item style={{ padding: '0px', marginTop: '40px' }}>
              {/* These are assignment lists */}
              <AssignmentList
                initialPaperworks={assignments}
                participantId={participantId}
                formatDate={this.formatDate}
                userType={userType}
              />
              <ActionItemCard
                title="hello there"
                description="hi there again"
                category="education"
                dueDate="4/20/20"
                selectCardFunc={e => {
                  console.log(e);
                }}
                lastEntry
              />
            </Grid>
            <Grid item style={{ padding: '0px', marginTop: '20px' }}>
              {/* These are studio assessments lists */}
              <StudioAssessmentList
                initialStudioAssessments={studioAssessments}
                formatDate={this.formatDate}
                userType={userType}
                participantId={participantId}
              />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

// ActionItemCard.propTypes = {
//   classes: PropTypes.object.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   category: PropTypes.string.isRequired,
//   dueDate: PropTypes.string,
//   selectCardFunc: PropTypes.func,
//   lastEntry: PropTypes.bool,
// };

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
  // Need the following for the assignments and studioAssessments
  assignments: PropTypes.array.isRequired,
  studioAssessments: PropTypes.array.isRequired,
};

export default withStyles(styles)(ParticipantShowPage);
