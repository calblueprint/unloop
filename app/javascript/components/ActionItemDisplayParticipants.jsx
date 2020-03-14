import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';

class ActionItemDisplayParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
        };
    }

    render() {
        let participantCards = this.state.participants.map((p) =>
            <ActionItemParticipant name={p.name}/>
        );
        return (
            <div className='displayParticipants'>
                {/* Students top bar */}
                <div className='students'>
                </div>

                {/* List students out */}
                <div className='participants'>
                    {participantCards}
                </div>

            </div>
        )
    }
}

export default ActionItemDisplayParticipants;