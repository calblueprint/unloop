/**
 *
 * StaffDashboardPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class StaffDashboardPage extends React.Component {
  render() {
    const { classes } = this.props;
    return <div className={classes.root}></div>;
  }
}

StaffDashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles))(StaffDashboardPage);
