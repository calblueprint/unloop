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
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles';


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
            color="#9EDC8E"
          />
        );
      case 'leaf':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faLeaf}
            color="#9EDC8E"
          />
        );
      case 'pen':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faPen}
            color="#9EDC8E"
          />
        );
      case 'file':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faFile}
            color="#9EDC8E"
          />
        );
      case 'smile':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faSmile}
            color="#9EDC8E"
          />
        );
      case 'code':
        return (
          <FontAwesomeIcon
            className="icon-large"
            icon={faCode}
            color="#9EDC8E"
          />
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
  actionItem: PropTypes.object,
};

export default withStyles(styles)(ActionItemCard);
