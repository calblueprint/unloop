import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ActionItemParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeChecked = this.changeChecked.bind(this);
    }

    changeChecked(user) {
        this.props.changeChecked(user)
    }

    render() {

        // Temp. placement for colors here
        const colors = {
            'r0': '#5870EB',
            'r1': '#EB6658',
            'r2': '#009FAD',
        }

        const { classes } = this.props;
        // 1. Render component
        // 2. Allow hover (show X) to remove the participant
        // 3. Color each name by their type/status in the current pipeline (R0, R1, or R2)
        let button;
        if (this.props.checked != null) {
            if (!this.props.checked) {
                button = <AddIcon
                            color='primary' // Change to grey
                            // horizontalAlign='right'
                            float='right'
                            position='absolute'
                            right='0px'
                            onClick={() => this.changeChecked(this.props.participant)}
                        />;
            } else {
                button = <CheckCircleIcon 
                            color='primary'
                            position='absolute'
                            right='0px'
                            // horizontalAlign='right'
                            onClick={() => this.changeChecked(this.props.participant)}
                        />;
            }
        } 

        return (
            <div>
                <div className={classes.participant}>
                    <div style={{
                        display: 'flex', 
                        width: '70%', 
                        lineHeight: '30px', 
                        height: '30px'
                    }}>
                        <Box className={classes.participantBar} style={{backgroundColor: colors[this.props.participant.status]}}/>
                        {this.props.participant.name}
                    </div>
                    {button}
                </div>
                <Divider/>
            </div>
        )
        
    }
}

export default withStyles(styles)(ActionItemParticipant);