import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Logout extends Component {
  componentDidMount() {
    if (!window.localStorage.getItem('auth0IdToken')) {
      this.props.router.replace('/');
    }

    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    this.props.router.replace('/');
    window.location.reload();
  }

  render () {
    return <h1>Logging out...</h1>;
  }
}

export default withRouter(Logout);
