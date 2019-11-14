/**
 *
 * QuestionnaireForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

function QuestionnaireForm({ classes }) {
  return <div className={classes.root}>hello</div>;
}

QuestionnaireForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), memo)(QuestionnaireForm);
