import React, { Component } from 'react';
import LoginAuth0 from './LoginAuth0';

import {
  Link,
  IndexLink,
} from 'react-router';

const NavLink = (props) => {
  return (
    <Link to={props.link} className='nav-item is-tab' activeClassName="is-active" onClick={props.onClick}>
      {props.title}
    </Link>
  );
};

export default class Navigation extends Component {
  state = {
    mobileActive: false
  }

  toggleMenu= () => {
    this.setState({mobileActive: !this.state.mobileActive});
  }

  closeMenu = () => {
    this.setState({mobileActive: false});
  }

  render () {
    let isActive = this.state.mobileActive ? "is-active" : '';

    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <IndexLink to="/" className="nav-item is-tab" activeClassName="is-active">
              Instaclone
            </IndexLink>
          </div>
          <span className="nav-toggle" onClick={this.toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className={`${isActive} nav-right nav-menu`}>
            {this.props.user &&
              [<NavLink link="/new" title="New Post" key="newpost" onClick={this.closeMenu} />,
               <NavLink link="/profile" title="Profile" key="profile" onClick={this.closeMenu} />,
               <NavLink link="/logout" title="Logout" key="logout" onClick={this.closeMenu} /> ]
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
