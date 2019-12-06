import React from "react";
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/login.scss';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this._handleLogin = this._handleLogin.bind(this);
  }

  componentDidMount () {
}

  _handleLogin() {
    console.log(this.props.path);
    window.location.href = this.props.path;
  
  }

  render() {
    return (
      <div className="login-screen">
        <div className="login-container">
          <div className="unloop-image">
            <img src={require('./unloopers.png')} className="unloop-image"/>
          </div>
          <div className="login">
            <div className="login-box">
              <img src={require('./unloop_logo_white.png')} width={300}  mode='fill'/>
              <div className="sign-in-button" >
                <img src={require("./btn_google_signin_light_focus_web@2x.png")} width ="250" onClick={this._handleLogin}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Login;
