import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, 
    Dialog, 
    Grid, 
    Paper
} from '@material-ui/core';


class ActionItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description, 
            title: this.props.title,
            default: false,
            completed: false,
            open: false,

        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    
    }
    handleOpen() {
        this.setState({open: true});
    }
    handleClose() {
        this.setState({open: false})
    }
    render(){
        return(
            <>
            <Button>
                className = "contained"
                color = "primary"
                onClick ={this.handleOpen}

            </Button>
            </>
        );
    }
}

export default ActionItemModal;