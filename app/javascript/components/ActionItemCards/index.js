import React from 'react';
import PropTypes from 'prop-types';
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
    let icon = null;
    switch (AssignmentCategory) {
      case 'house':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faHome}
            color="#9EDC8E"
          />
        );
        break;
      case 'leaf':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faLeaf}
            color="#9EDC8E"
          />
        );
        break;
      case 'pen':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faPen}
            color="#9EDC8E"
          />
        );
        break;
      case 'file':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faFile}
            color="#9EDC8E"
          />
        );
        break;
      case 'smile':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faSmile}
            color="#9EDC8E"
          />
        );
        break;
      case 'code':
        icon = (
          <FontAwesomeIcon
            className="icon-large"
            icon={faCode}
            color="#9EDC8E"
          />
        );
        break;
    }
    return icon;
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
