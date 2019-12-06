/**
 *
 * CaseNoteCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import theme from 'utils/theme';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import styles from './styles';

class CaseNoteCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}></div>
      </ThemeProvider>
    );
  }
}

CaseNoteCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CaseNoteCard);
