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
    const dt = dateObj.getDate();
    return `${month.toString()}/${dt.toString()}/${year.toString()}`;
  };

  sampleActionItem = [
    {
      id: 13,
      title: 'panel',
      description:
        'Try to synthesize the XSS panel, maybe it will input the open-source hard drive!',
      is_template: false,
      created_at: '2020-04-17 02:07:27',
      updated_at: '2020-04-17 02:07:27',
      category: 'Community',
    },
  ];

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

    // console.log('case notes', caseNotes);
    // console.log('paperworks', paperworks);
    // console.log('assignments', assignments);
    // console.log('participantId', participantId);
    // console.log('studio assessments', studioAssessments[0]);
    // console.log('sample action item', this.sampleActionItem);

    return (
      <Grid
        container
        direction="row"
        style={{
          margin: '0px',
          padding: '0px',
          width: '100%',
        }}
        // justify="space-between"
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
        <Grid item xs={5} className={classes.rightHalf}>
          {/* <Grid item style={{ marginTop: '20px' }}> */}
          {/* <Grid item xs={5} className={classes.rightHalf}>
            <Grid item style={{ padding: '0px', marginTop: '40px' }}> */}

          <AssignmentList
            userType={userType}
            initialAssignments={this.sampleActionItem}
            participantId={participantId}
            formatDate={this.formatDate}
          />
          <StudioAssessmentList
            initialStudioAssessments={studioAssessments}
            formatDate={this.formatDate}
            userType={userType}
            participantId={participantId}
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
  // Need the following for the assignments and studioAssessments
  assignments: PropTypes.array.isRequired,
  studioAssessments: PropTypes.array.isRequired,
};

export default withStyles(styles)(ParticipantShowPage);
