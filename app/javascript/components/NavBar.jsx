import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { apiDelete } from 'utils/axios';
import axios from 'axios';

class NavBar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    //   TODO: Sign out is not working
    const path = "/user/sign_out"
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
        },
        withCredentials: true,
      };
    axios.delete(path, { ...config });

  }

  render() {
    return (
      <div>
        <div className="left-navbar">
          <button className="sign-out-button">
            Sign out
          </button>
          <a href="/">
            <FontAwesomeIcon icon={faHome} color="white" size="lg" />
          </a>
        </div>
      </div>
    );
  }
}
export default NavBar;
