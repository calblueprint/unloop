import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class ActionItemParticipant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
        this.changeAndPass = this.changeAndPass.bind(this);
    }

    // Changes checked state and passes up participant, if applicable.
    changeAndPass(user) {
        if (!this.state.checked) {
            this.props.addFunc(user);
        } else {
            this.props.removeFunc(user);
        }
        this.setState(prevState => (
            {checked: !prevState.checked}
        ))
    }

    render() {
        // 1. Render component
        // 2. Allow hover (show X) to remove the participant
        // 3. Color each name by their type/status in the current pipeline (R0, R1, or R2)
        let button;
        if (this.props.addFunc || this.props.removeFunc) {
            if (!this.state.checked) {
                button = <AddIcon onClick={() => this.changeAndPass(this.props.participant)}/>;
            } else {
                button = <CheckCircleIcon onClick={() => this.changeAndPass(this.props.participant)}/>;
            }
        }
        return (
            <div>
                <p>This person is {this.props.participant.name}!</p>
                {button}
                {/* <AddIcon onClick={this.dummy}/> */}
            </div>
        )
    }

}

export default ActionItemParticipant;