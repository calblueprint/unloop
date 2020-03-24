import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
        const { classes } = this.props;
        // 1. Render component
        // 2. Allow hover (show X) to remove the participant
        // 3. Color each name by their type/status in the current pipeline (R0, R1, or R2)
        let button;
        if (this.props.checked != null) {
            if (!this.props.checked) {
                button = <AddIcon
                            className={classes.icon} 
                            onClick={() => this.changeChecked(this.props.participant)}
                        />;
            } else {
                button = <CheckCircleIcon 
                            className={classes.icon} 
                            onClick={() => this.changeChecked(this.props.participant)}
                        />;
            }
        }

        return (
            <div className={classes.participant}>
                This person is {this.props.participant.name}
                {button}
            </div>

        )
        
    }
}

export default withStyles(styles)(ActionItemParticipant);