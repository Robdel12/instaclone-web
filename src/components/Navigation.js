import React, { Component } from 'react';
import LoginAuth0 from './LoginAuth0';

import {
  Link,
  IndexLink
} from 'react-router';

const NavLink = (props) => {
  return (
    <Link to={props.link} className='nav-item is-tab' activeClassName="is-active">
      {props.title}
    </Link>
  );
};

export default class Navigation extends Component {
  render () {
    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <IndexLink to="/" className="nav-item is-tab" activeClassName="is-active">
              Instaclone
            </IndexLink>
          </div>
          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="nav-right nav-menu">
            <a className="nav-item is-tab is-hidden-tablet is-active">Home</a>
            <a className="nav-item is-tab is-hidden-tablet">Features</a>
            <a className="nav-item is-tab is-hidden-tablet">Pricing</a>
            <a className="nav-item is-tab is-hidden-tablet">About</a>
            {this.props.user &&
              [<NavLink link="/new" title="New Post" key="newpost" />,
               <NavLink link="/profile" title="Profile" key="profile" />,
               <NavLink link="/logout" title="Logout" key="logout" /> ]
               }
               {!this.props.user &&
                 <LoginAuth0 />
               }
          </div>
        </div>
      </nav>
    );
  }
}
