import React from 'react';
import {
    Button,
    Typography,
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
        return (
            // <div className={classes.displayParticipants}>
            <div>
                {/* Students top bar */}
                <div className='students'>
                    STUDENTS
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