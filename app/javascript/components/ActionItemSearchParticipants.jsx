import React from 'react';
import {
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            categories: this.props.categories,
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
        this.allSelect = this.allSelect.bind(this);
        this.participantToString = this.participantToString.bind(this);

        // Creating dictionary to keep track of the current checked-or-not state for each child
        this.participantAndState = {}
        this.state.participants.forEach(p => 
            this.participantAndState[this.participantToString(p)] = false
        );
    }

    // Converts the participant's attributes to a string to be stored as a key (this will not be needed if participants
    // have unique ID's instead).
    //
    // Workaround for objects not being able to be stored as separate keys, as seen here:
    // https://stackoverflow.com/questions/7196212/how-to-create-dictionary-and-add-key-value-pairs-dynamically/7196529

    participantToString(user) {
        let stringId = "";
        Object.keys(user).forEach((attr) => {
            stringId += attr + user[attr];
        })
        return stringId;
    }

    // Change the state for one of the child components when the 'plus' button is toggled and passes this info to parent class.
    changeChecked(user) {

        let newVal = !this.participantAndState[this.participantToString(user)];
        this.participantAndState[this.participantToString(user)] = newVal;

        if (newVal) { // Participant was selected
            console.log("You added this user:", user);
            this.props.addUser(user);

        } else { // Participant was de-selected
            console.log("You removed this user:", user);
            this.props.removeUser(user);
        }
    }

    // Load in all the different participants from a 'TrieSearch' by name
    componentDidMount() {
        const { participants } = this.props;
        const trie = new TrieSearch('name');
        trie.addAll(participants);
        this.setState({
            trie,
        });
    }

    // For searching the different participants
    handleChange(e) {
        const searchVal = e.target.value;
        if (searchVal === '') {
            this.setState({
                participants: this.props.participants,
            });
            return;
        }
        const participants = this.state.trie.get(searchVal);
        this.setState({
            participants,
        });
    }

    // For selecting or de-selecting all participants
    allSelect(e) {

        this.props.participants.forEach(p => {
            this.participantAndState[this.participantToString(p)] = e.target.checked;
        })

        if (e.target.checked) {
            console.log("You added all users");
            this.props.addAllUsers();
        } else {
            console.log("You removed all users");
            this.props.removeAllUsers();
        }
    }

    render() {

        let participantCards = this.state.participants.map(p =>
            <ActionItemParticipant
                participant={p}
                checked={this.participantAndState[this.participantToString(p)]}
                changeChecked={this.changeChecked}
            />
        );
    
        return (
            <div className='searchParticipants'>
                
                {/* For the top 'ADD STUDENTS' Bar */}
                <div className='topBar'>
                    ADD STUDENTS
                </div>

                {/* Filter By Category */}
                {/* <div className='categories'>
                    <Categories categories={categories}/>
                </div> */}

                {/* Search for Individual */}
                <div className='listIndividuals'>
                    {participantCards}
                </div>

                {/* Select All Button */}
                <FormControlLabel
                    control={<Checkbox color="primary" onClick={this.allSelect}/>}
                    label="SELECT ALL"
                />
            </div>
        )
    }

}

export default ActionItemSearchParticipants;