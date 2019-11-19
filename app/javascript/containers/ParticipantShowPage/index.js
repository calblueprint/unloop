/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import validator from 'validator';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import QuestionnaireForm from 'containers/QuestionnaireForm';
import PaperworkList from 'components/PaperworkList';
import CaseNoteContainer from 'containers/CaseNoteContainer';
import theme from 'utils/theme';
import { apiPost } from 'utils/axios';
import { Grid, Typography } from '@material-ui/core';
import styles from './styles';

class ParticipantShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paperworkLink: '',
      paperworkTitle: '',
      // dueDate: null,
      paperworkErrors: {
        title: '',
        link: '',
      },
    };
  }

  checkPaperworkErrors = field => () => {
    let errorMessage = '';
    if (field === 'title') {
      const title = this.state.paperworkTitle;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        errorMessage = 'Title is required';
      }
    } else if (field === 'link') {
      const link = this.state.paperworkLink;
      if (link === '' || validator.isEmpty(link, { ignore_whitespace: true })) {
        errorMessage = 'Link is required';
      } else if (!validator.isURL(link, { require_protocol: true })) {
        errorMessage = 'Link is not valid';
      }
    }

    this.setState(prevState => ({
      paperworkErrors: {
        ...prevState.paperworkErrors,
        [field]: errorMessage,
      },
    }));
  };

  handleSubmitPaperwork = () => {
    const body = {
      link: this.state.paperworkLink,
      title: this.state.paperworkTitle,
      participant_id: this.props.participantId,
      agree: false,
    };

    const errors = this.state.paperworkErrors;
    let hasErrors = false;
    Object.keys(errors).forEach(field => {
      this.checkPaperworkErrors(field)();
      hasErrors = hasErrors || errors[field] !== '';
    });

    if (!hasErrors) {
      apiPost('/api/paperworks', { paperwork: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
      // TODO: Change this to flash an error message
    }
  };

  onFormFieldChange = (field, value) => {
    this.setState({
      [field]: value,
    });
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
                  paperworkErrors={this.state.paperworkErrors}
                  checkPaperworkErrors={this.checkPaperworkErrors}
                  onFormFieldChange={this.onFormFieldChange}
                  handleSubmitPaperwork={this.handleSubmitPaperwork}
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
