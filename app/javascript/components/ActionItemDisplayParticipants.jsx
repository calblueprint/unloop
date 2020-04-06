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

        return (
            <div className={classes.displayParticipant}>
                
                {/* Students top bar */}
                <div className='students' style={{color: '#5870EB'}}>
                    Students
                    <Box className={classes.boxProps}/>
                    <Divider/>
                </div>

                <Box className={classes.boundaryBox}>
                    <div className={classes.displayScroll}>

                        {/* List students out */}
                        <div className='participants' style={{direction: 'ltr'}}>
                            {participantCards}
                        </div>
                    </div>
                </Box>

            </div>
        )
    }
}

export default withStyles(styles)(ActionItemDisplayParticipants);