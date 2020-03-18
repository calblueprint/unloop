import React from 'react';
import PropTypes from 'prop-types';
import './ActionItemCard.css';
import {
  faLeaf,
  faHome,
  faPen,
  faFile,
  faSmile,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Uses CSS File for now. Need to change.
class ActionItemCard extends React.Component {
  constructor(props) {
    super(props);
    /*
    TODO: check props types
    tempory props rn to test components
    props:
    actionItem - Javascripy object
      title - Assignment title: String
      description - Short description: String
      date - Due date of assignment: JavaScript date?
      category - type of assignment: string??
      status - status of item: string
    */
  }

  // render icon based on category
  renderIcon() {
    const AssignmentCategory = this.props.actionItem.category;
    switch (AssignmentCategory) {
      case 'house':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faHome}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
      case 'leaf':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faLeaf}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
      case 'pen':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faPen}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
      case 'file':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faFile}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
      case 'smile':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faSmile}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
      case 'code':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faCode}
            color="#8E8E8E"
          ></FontAwesomeIcon>
        );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="rectangle"></div>
        {this.renderIcon()}
        <div className="info">
          <div className="text">{this.props.actionItem.description}</div>
          <div className="date">
            DATE ASSIGNED: {this.props.actionItem.date.toLocaleDateString()}
          </div>
        </div>
        <div className="assign">VIEW ASSIGNMENT</div>
      </div>
    );
  }
}

ActionItemCard.propTypes = {
  participant: PropTypes.object,
};

export default ActionItemCard;