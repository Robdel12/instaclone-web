import React, { Component, PropTypes } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router';

class LoginAuth0 extends Component {

  constructor (props) {
    super(props);

    this._lock = new Auth0Lock(process.env.REACT_APP_AUTH_0_CLIENT_ID, process.env.REACT_APP_AUTH_0_DOMAIN);
  }

  static propTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      this.props.router.push(`/signup`);
    });
  }

  _showLogin = () => {
    this._lock.show();
  }

  render() {
    return (
      <a className="nav-item" onClick={this._showLogin}>
        Login
      </a>
    );
  }
}

export default withRouter(LoginAuth0);
