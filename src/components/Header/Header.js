import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  }

  renderPrivateNav() {
    return (
      <div>
        <span className="user-name">
          {this.context.user.name}
        </span>
        <nav>
          <Link 
            onClick={this.handleLogoutClick}
            to='/login'
          >
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderPublicNav() {
    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>myBiblio</h1>
        {TokenService.hasAuthToken()
          ? this.renderPrivateNav()
          : this.renderPublicNav()}
      </header>
    )
  }
}

export default Header;