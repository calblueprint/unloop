import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            categories: this.props.categories,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSelectParticipant = this.onSelectParticipant.bind(this);
        this.onDeselectParticipant = this.onDeselectParticipant.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.onDeselectAll = this.onDeselectAll.bind(this);
    }

    // When selecting a participant, update the state in the parent class.
    onSelectParticipant(user) {
        console.log("You added this user:", user);
        this.props.funcs.addUser(user);
    }

    // When de-selecting a participant, update the state in the parent class.
    onDeselectParticipant(user) {
        console.log("You removed this user:", user);
        this.props.funcs.removeUser(user);
    }

    // When selecting all participants, update the state in the parent class in one go.
    onSelectAll(users) {
        console.log("You added all users");
        this.props.funcs.addAllUsers(users);
    }

    // When de-selecting all participants, update the state in the parent class in one go.
    onDeselectAll(users) {
        console.log("You removed all users");
        this.props.funcs.TypographyremoveAllUsers(users);
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

    render() {
        let participantCards = this.state.participants.map((p) => 
            // Can only select a participant ATM if you select on the plus box, not if you select on the participant name itself.
            <ActionItemParticipant participant={p} addFunc={this.onSelectParticipant} removeFunc={this.onDeselectParticipant}/> 
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
                {/* <CheckBoxOutlineBlankIcon onClick={() => this.onSelectAll(this.state.remainingParticipants)}>SELECT ALL</CheckBoxOutlineBlankIcon> */}
            </div>
        )
    }

}

export default ActionItemSearchParticipants;