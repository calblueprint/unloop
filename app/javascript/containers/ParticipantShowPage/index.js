/**
 *
 * ParticipantShowPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import QuestionnaireForm from 'components/QuestionnaireForm';
import styles from './styles';

class ParticipantShowPage extends React.Component {
  render() {
    const {
      classes,
      personalQuestionnaire,
      professionalQuestionnaire,
      participantId,
    } = this.props;

    return (
      <div className={classes.root}>
        <QuestionnaireForm />
      </div>
    );
  }
}

ParticipantShowPage.propTypes = {
  classes: PropTypes.object.isRequired,
  personalQuestionnaire: PropTypes.object.isRequired,
  professionalQuestionnaire: PropTypes.object.isRequired,
  participantId: PropTypes.number.isRequired,
};

export default compose(withStyles(styles))(ParticipantShowPage);
