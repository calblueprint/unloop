import React from "react";
import Button from '@material-ui/core/Button';
import '../../assets/stylesheets/paperworks.scss';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core/';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this._handleLogin = this._handleLogin.bind(this);
  }

  componentDidMount () {
    // const script = document.createElement("script");
    // script.src = "https://apis.google.com/js/platform.js";
    // script.async = true;
    // document.body.appendChild(script);
}

  _handleLogin() {
    window.location.href = this.props.path;
  }

  render() {
    return (
        // <div class="g-signin2" onClick={this._handleLogin}></div>
      <div>
        <Button variant="outlined" color="primary" onClick={this._handleLogin}>
          Sign in with Google
        </Button>
      </div>
    );
  }
}

export default Login;
