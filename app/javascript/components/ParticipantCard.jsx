import React from 'react';
import PropTypes from 'prop-types';
import './ActionItemCard.css'; 
import {
  faLeaf,
  faHome,
  faPen,
  faFile,
  faSmile,
  faCode
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class ParticipantCard extends React.Component {
  constructor(props) {
    super(props);
    /*
    TODO: check props types
    tempory props rn to test components
    props:
    actionItem - Javascripy object
      title - Assignment title: String
      description - Short description: String
      due - Due date of assignment: JavaScript date?
      category - type of assignment: string??
    */
  }

  renderIcon() {
    let AssignmentCategory = this.props.actionItem.category;
    switch(AssignmentCategory){
      case "house":
        return  <FontAwesomeIcon className='icon-large' icon={faHome} color={'#8E8E8E'} ></FontAwesomeIcon>;
      case "leaf":
        return  <FontAwesomeIcon className='icon-large' icon={faLeaf} color={'#8E8E8E'} ></FontAwesomeIcon>;
      case "pen":
        return  <FontAwesomeIcon className='icon-large' icon={faPen} color={'#8E8E8E'} ></FontAwesomeIcon>;
      case "file":
        return  <FontAwesomeIcon className='icon-large' icon={faFile} color={'#8E8E8E'} ></FontAwesomeIcon>;
      case "smile":
        return  <FontAwesomeIcon className='icon-large' icon={faSmile} color={'#8E8E8E'} ></FontAwesomeIcon>;  
      case "code":
        return  <FontAwesomeIcon className='icon-large' icon={faCode} color={'#8E8E8E'} ></FontAwesomeIcon>;   
    }
  }

  render() {
    let a = this.props.actionItem;
    // let status = p.status.toUpperCase();
    // let name = p.name;
    let statusColor;
    if (status == "R0") {
      statusColor = "#009FAD"
    } else if (status == "R1") {
      statusColor = "#5870EB"
    } else {
      statusColor = "#DF6C8E"
    }
    //let caseNotes = (p.caseNotesCount == 1) ? p.caseNotesCount + " case note" : p.caseNotesCount + " case notes"
    return (
      <div className = "card">
        <div className = 'rectangle'></div>
        {this.renderIcon()}
        <div className = "text">
          {this.props.actionItem.description}
          </div>
        <div className = "assign"> 
          VIEW ASSIGNMENT
        </div>
      </div>
    );
  }
}

ParticipantCard.propTypes = {
  participant: PropTypes.object,
};

export default ParticipantCard;
