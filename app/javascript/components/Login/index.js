import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Login({ classes, path }) {
  const handleLogin = () => {
    window.location.href = path;
  };

  return (
    <div className={classes.background}>
      <div className={classes.loginScreen}>
        <div className={classes.loginContainer}>
          <div className={classes.unloopImage}>
            <img
              src="/assets/unloopers.png"
              alt="Blueprint Unloop team"
              className={classes.unloopImage}
            />
          </div>
          <div className={classes.login}>
            <div className={classes.loginBox}>
              <img
                src="/assets/unloop_logo_white.png"
                alt="Organization logo"
                width={300}
                mode="fill"
              />
              <div className={classes.signInButton}>
                <button
                  type="button"
                  className={classes.buttonStyling}
                  onClick={handleLogin}
                  onKeyDown={handleLogin}
                >
                  <img
                    src="/assets/btn_google_signin_light_focus_web@2x.png"
                    alt="Sign in with Google"
                    width="250"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default withStyles(styles)(Login);
