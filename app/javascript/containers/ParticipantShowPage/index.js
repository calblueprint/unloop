/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import QuestionnaireForm from 'containers/QuestionnaireForm';
import PaperworkList from 'components/PaperworkList';
import CaseNoteContainer from 'containers/CaseNoteContainer';
import theme from 'utils/theme';
import { Grid, Typography } from '@material-ui/core';
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
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Grid container direction="row">
          <Grid item xs={6} className={classes.leftHalf}>
            <Grid container direction="column" spacing={3}>
              <Grid item container direction="row" alignItems="center">
                <Typography variant="h2">{fullName}</Typography>
                <Typography variant="h3">{status}</Typography>
              </Grid>
              <Grid item container direction="row" spacing={1}>
                <Grid item>
                  <QuestionnaireForm
                    questionnaireType="Personal"
                    participantId={participantId}
                    questionnaire={personalQuestionnaire}
                  />
                </Grid>
                <Grid item>
                  <QuestionnaireForm
                    questionnaireType="Professional"
                    participantId={participantId}
                    questionnaire={professionalQuestionnaire}
                  />
                </Grid>
              </Grid>
              <Grid item>
                <PaperworkList
                  paperworks={paperworks}
                  participantId={participantId}
                  formatDate={this.formatDate}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.rightHalf}>
            <CaseNoteContainer
              participant={participant}
              caseNotes={caseNotes}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

ParticipantShowPage.propTypes = {
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

export default compose(withStyles(styles))(ParticipantShowPage);
