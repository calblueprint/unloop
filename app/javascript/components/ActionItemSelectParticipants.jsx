import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ActionItemSearchParticipants from './ActionItemSearchParticipants';
import ActionItemDisplayParticipants from './ActionItemDisplayParticipants';
import styles from './styles';

// function ActionItemSelectParticipants({ classes }) {

class ActionItemSelectParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            selectedParticipants: [],
            // For dummy participants
            // participants: this.getDummyParticipants(),
            funcs: {
                addUser: this.addUserToState, 
                removeUser: this.removeUserFromState, 
                addAllUsers: this.addAllUsersToState,
                removeAllUsers: this.removeAllUsersFromState,
            }
        }
        this.addUserToState = this.addUserToState.bind(this);
        this.removeUserFromState = this.removeUserFromState.bind(this);
        this.addAllUsersToState = this.addAllUsersToState.bind(this);
        this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
    }

    // Adds selected user to state to be displayed
    addUserToState(user) {
        console.log("Trying to add:", user);
        console.log(this.state);
        this.setState(prevState => ({
            selectedParticipants: [...prevState.selectedParticipants, user]
        }));
        // this.setState({
        //     selectedParticipants: [...this.state.selectedParticipants, user]
        // })
    }

    // Removes user from display
    removeUserFromState(user) {
        var copy = [...this.state.selectedParticipants];
        var index = this.state.selectedParticipants.indexOf(user);
        copy.splice(index, 1); // Removes one element at `index` location
        this.setState({
            selectedParticipants: copy,
        })
    }

    // Adds all users at once to be displayed
    addAllUsersToState(users) {
        this.setState({
            selectedParticipants: users,
        })
    }

    // Removes all users at once from display
    removeAllUsersFromState(users) {
        this.setState({
            selectedParticipants: [],
        })
    }

    // getParticipants() {
    //     this.setState({participants: this.apiGet('users/')});
    // }
    
    render() {
        return (
            // Overall component
            <div className='entirePage'>

                {/* Top part of page */}
                {/* Images of dots and stuff here */}
                <Typography>Create New Assignment List</Typography> 

                {/* Rendering right side of page (for listing people) */}
                <ActionItemDisplayParticipants selectedParticipants={this.state.selectedParticipants} className={styles.participant}/>

                {/* Rendering left side of page (for searching). Should I pass in categories in here too? */}
                <ActionItemSearchParticipants participants={this.state.participants} funcs={this.state.funcs}/>

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

// function ActionItemSelectParticipants({ classes }) {

// ActionItemSelectParticipants.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ActionItemSelectParticipants);

export default ActionItemSelectParticipants;