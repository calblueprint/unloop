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
    // const script = document.createElement("script");
    // script.src = "https://apis.google.com/js/platform.js";
    // script.async = true
    // document.body.appendChild(script);
}

  _handleLogin() {
    console.log(this.props.path);
    window.location.href = this.props.path;
  
  }

  render() {
    return (
        <div className="login-container">
          <div className="login">
          <div className="login-box">
            <h2 className="title"> Welcome, please sign in:</h2>
            <img src={require('./unloop_logo_teal.png')} width={300}  mode='fill'/>
            <div className="sign-in-button" >
              {/* <div class="g-signin2" data-width="250" data-height="50" data-longtitle="true" onClick={this._handleLogin}></div> */}
              <img src={require("./btn_google_signin_light_normal_web@2x.png")} width ="200" onClick={this._handleLogin}></img>
            </div>
          </div>
        </div>
      </div>
      
      // <div>
      //   <Button variant="outlined" color="primary" onClick={this._handleLogin}>
      //     Sign in with Google
      //   </Button>
      // </div>
    );
  }
}

export default Login;
