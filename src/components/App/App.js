import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from '../Header/Header';
import PublicOnlyRoute from '../PublicOnlyRoute';
import PrivateRoute from '../PrivateRoute';

// ROUTES
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LibraryRoute from '../../routes/LibraryRoute/LibraryRoute';
import BorrowedRoute from '../../routes/BorrowedRoute/BorrowedRoute';

// STYLES
import './App.css';

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  } 
  
  render() {
    const { hasError } = this.state;
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PublicOnlyRoute 
              exact
              path={'/'}
              component={LandingPageRoute}
            />
            <PrivateRoute 
              path={'/library'}
              component={LibraryRoute}
            />
            <PrivateRoute
              path={'/borrowed'}
              component={BorrowedRoute}
            />  
            <PublicOnlyRoute 
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute 
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}