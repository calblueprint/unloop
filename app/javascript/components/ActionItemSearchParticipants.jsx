import React from 'react';
import {
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    InputBase,
    Fab,
    Box,
    Divider
} from '@material-ui/core';
import ActionItemParticipant from './ActionItemParticipant';
import { apiGet } from '../utils/axios';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";

const TrieSearch = require('trie-search');

class ActionItemSearchParticipants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants: this.props.participants,
            statuses: [],
            selectedStatus: null,
            participantAttrs: {},
            searchValue: '',
            filteredParticipants: [], // Iterate over this list if you want to filter over twice
        };
        this.filterByName = this.filterByName.bind(this);
        this.changeChecked = this.changeChecked.bind(this);
        this.allSelect = this.allSelect.bind(this);

        // The following dictionary is to keep track of each participant to see if
        // 1. They've been selected or not
        // 2. They've been filtered to be seen or not

        this.state.participants.forEach(p =>
            this.state.participantAttrs[p.id] = {
                selected: false,
                visible: true,
            }
        );

        // Putting all the different existing categories in state via back-end request.
        this.fetchCategories();
    }

    // Load in all the different participants from a 'TrieSearch' by name
    componentDidMount() {
        const trie = new TrieSearch('name');
        trie.addAll(this.state.participants);
        this.setState({
            trie,
        });
    }

    // For searching the different participants
    // Can only be rendered if found in the Trie AND is appropriate category (category is first filter, name is second)
    filterByName(e) {
        const searchVal = e.target.value;
        this.setState({
            searchValue: searchVal,
        })

        // Find the filtered participants.
        var filterTemp;
        if (searchVal === '') {
            filterTemp = this.state.participants;
        } else {
            filterTemp = this.state.trie.get(searchVal);
        }

        // Save run-time and search by putting filtered participant ID's in a Set.
        var filterParticipants = new Set();
        filterTemp.forEach(p => {
            filterParticipants.add(p.id);
        })

        // Render participants IF they are properly filtered AND they have the current 'selectedStatus'.
        this.state.participants.map(p => {
            let validate = this.state.selectedStatus || p.status; // In the case for no active filter
            this.state.participantAttrs[p.id]['visible'] = (validate == p.status) && (filterParticipants.has(p.id));
        })
        
        // For some reason, this.state.participantAttrs was being updated properly, but wasn't
        // causing  a re-render of the component, so I forced the component to re-render instead. 
        // Please let me know if there's a workaround to this-- I think this isn't good practice.
        // console.log(this.state.participantAttrs);
        // this.forceUpdate();

        // Only change true to false if you move from here to Category filter. Don't change any false to true.
        // Keep track of whether not search is being used (=== '').
    }

    async fetchCategories() {
        const url = 'api/participants/statuses'
        let promise = apiGet('api/participants/statuses');
        promise.then((p) => {
            this.setState({
                statuses: p.data,
            });
        });
    }

    // Change the state for one of the child components when the 'plus' button is toggled and passes this info to parent class.
    changeChecked(user) {
        let newVal = !this.state.participantAttrs[user.id]['selected'];
        this.state.participantAttrs[user.id]['selected'] = newVal;

        if (newVal) { // Participant was selected
            console.log("You added this user:", user);
            this.props.addUser(user);

        } else { // Participant was de-selected
            console.log("You removed this user:", user);
            this.props.removeUser(user);
        }
    }

    // For selecting or de-selecting all participants
    allSelect(e) {
        this.props.participants.forEach(p => {
            this.state.participantAttrs[p.id]['selected'] = e.target.checked;
        })
        if (e.target.checked) {
            console.log("You added all users");
            this.props.addAllUsers();
        } else {
            console.log("You removed all users");
            this.props.removeAllUsers();
        }
    }

    filterByStatus(status) {
        // 1. You click a filter, either a different one or for the first time.
        // 2. You click the same filter, rendering everyone again.

        // 1
        if (this.state.selectedStatus != status) {
            this.state.participants.map(p => {
                this.state.participantAttrs[p.id]['visible'] = p.status == status;
            })
        // 2
        } else {
            this.state.participants.map(p => {
                this.state.participantAttrs[p.id]['visible'] = true;
            })
            this.state.selectedStatus = null;
        }

        this.setState({
            selectedStatus: status,

            // // Delete current search. This may not be intended behavior, but a current 
            // // workaround for how search by name and category can work together.
            // searchValue: '',
        })
    }

    render() {
        const { classes } = this.props;

        // Temp. placement for colors here
        const colors = {
            'r0': '#5870EB',
            'r1': '#EB6658',
            'r2': '#009FAD',
        }

        let participantCards = this.state.participants.map(p => {
            if (this.state.participantAttrs[p.id]['visible']) {
                return (
                    <ActionItemParticipant
                        participant={p}
                        checked={this.state.participantAttrs[p.id]['selected']}
                        changeChecked={this.changeChecked}
                    />
                )
            }
        });

        let statusButtons = Object.keys(this.state.statuses).map((s) =>
            <Fab
                className={classes.statusButton}
                style={{
                    backgroundColor: colors[s],
                    marginTop: '20px',
                }}
                onClick={() => this.filterByStatus(s)}
            >
                {s}
            </Fab>
        );
        
        return (
            <div className={classes.searchParticipant}>
                
                {/* For the top 'ADD STUDENTS' Bar */}
                <div className='topBar' style={{color: '#5870EB'}}>
                    Add Students
                    <Box className={classes.boxProps}/>
                    <Divider/>
                </div>

                <div className='outerRectangle'>
                    <Box className={classes.boundaryBox}>
                        
                        {/* Filter By Category */}
                        <div className={classes.categories}>
                            FILTER BY CATEGORY
                            <div>
                                {statusButtons}
                            </div>
                        </div>

                        {/* Search for an individual */}
                        <div className={classes.searchIndividual}>
                            SEARCH FOR INDIVIDUAL<br/>
                            <InputBase
                                className={classes.searchBar}
                                onChange={this.filterByName}
                                value={this.state.searchValue}
                            />
                        </div>
                        
                        {/* List all the participant cards in scrolling fashion */}
                        <div className={classes.searchScroll}>
                            <div className='listIndividuals'>
                                {participantCards}
                            </div>
                        </div>

                        {/* Select All Button */}
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    color="primary" 
                                    onClick={this.allSelect}
                                />
                            }
                            style={{
                                marginLeft: '70%',
                                marginTop: '20px',
                                marginBottom: '30px',
                            }}
                            label="SELECT ALL"
                        />
                    </Box>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ActionItemSearchParticipants);