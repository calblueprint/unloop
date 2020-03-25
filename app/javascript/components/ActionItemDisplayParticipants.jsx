import React from 'react';
import {
    Button,
    Typography,
    Box,
    Divider
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ActionItemDisplayParticipants extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        let participantCards;
        if (this.props.selectedParticipants) {
            participantCards = this.props.selectedParticipants.map((p) =>
                <ActionItemParticipant participant={p} backgroundColor={styles.participant}/>
            );
        }
        const defaultProps = {
            bgcolor: '#5870EB',
            borderColor: '#5870EB',
            // border: 1,
            style: { width: '15rem', height: '0.4rem' },
            borderRadius: '5px 5px 0px 0px',
            marginTop: '2%',
          };
        return (
            // <div className={classes.displayParticipants}>
            <div>
                {/* Students top bar */}
                <div className='students'>
                    STUDENTS
                    <Box {...defaultProps}/>
                    <Divider/>
                </div>

                {/* List students out */}
                <div className='participants'>
                    {participantCards}
                </div>

            </div>
        )
    }
}

export default withStyles(styles)(ActionItemDisplayParticipants);