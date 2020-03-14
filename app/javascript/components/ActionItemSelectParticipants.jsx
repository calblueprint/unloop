import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
// import ActionItemParticipant from './ActionItemParticipant';
import ActionItemSearchParticipants from './ActionItemSearchParticipants';
import ActionItemDisplayParticipants from './ActionItemDisplayParticipants';
import { Children } from 'react';

class ActionItemSelectParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            // For dummy participants
            // participants: this.getDummyParticipants(),
        }
        // this.callBackFunction = this.callBackFunction.bind(this);
    }

    addUserToState(user) {
        this.setState(prevState => ({
            participants: [...this.prevState.participants, user]
        }));
    }

    getParticipants() {
        this.setState({participants: this.apiGet('users/')});
    }
    
    render() {
        return (
            // Overall component
            <div className='entirePage'>

                {/* Top part of page */}
                {/* Images of dots and stuff here */}
                <Typography>Add Students to Assignment:</Typography> 

                {/* Rendering left side of page (for searching). Should I pass in categories in here too? */}
                <ActionItemSearchParticipants participants={this.state.participants}/> {/*callBackFunction={this.addUserToState}/>

                {/* Rendering right side of page (for listing people) */}
                <ActionItemDisplayParticipants participants={this.state.participants}/>

                {/* Adding buttons for previous and next */}

            </div>
        )
    }
    
    getDummyParticipants() {
        let participants = [
            {
                'name': 'Calvin Chen',
                'category': 'R0',
            },
            {
                'name': 'Divi Schmidt',
                'category': 'R0',
            },
            {
                'name': 'Erin Song',
                'category': 'R0',
            },
            {
                'name': 'Christopher Grey',
                'category': 'R1',
            },
            {
                'name': 'Julian Kung',
                'category': 'R1',
            },
            {
                'name': 'Kyle Hua',
                'category': 'R2',
            },
            {
                'name': 'Joelene',
                'category': 'R3',
            },
        ]
        return participants;
    }
}

export default ActionItemSelectParticipants;