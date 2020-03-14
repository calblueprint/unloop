import React from 'react';
import {
    Button,
    Typography,
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            categories: this.props.categories,
            callBackFunction: this.props.callBackFunction,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // When selecting a participant, update the state in the parent class.
    onSelectParticipant(user) {
        this.state.callBackFunction(user);
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
            <ActionItemParticipant name={p.name}/>
        );

        return (
            <div className='searchParticipants'>
                
                {/* For the top 'ADD STUDENTS' Bar */}
                <div className='topbar'>
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
                
            </div>
        )
    }

}

export default ActionItemSearchParticipants;