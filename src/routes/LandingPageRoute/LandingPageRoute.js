import React, { Component } from 'react';

import './LandingPageRoute.css';

class LandingPageRoute extends Component {

  render() {
    return (
      <section className="landing-page">
        <h2>Welcome!</h2>

        <p>Welcome to myBiblio, an app for cataloging and tracking your personal library. Whether you are a bibliophile or an amateur book collector, this app is for you. myBiblio allows users to catalog each book they own, including the book's title, authors, genre, format, and whether they have or have not read a book or are currently reading it in each entry. It also aids users in the tracking of books they have lent out to friends to be sure that their library doesn't mysteriously shrink due to their generosity and their friends' forgetfulness!</p>

        <h3>Getting started</h3>
        <p>Getting started is very simple. If you already have an account, just click login to return to your library. Otherwise, sign up for a new account and begin cataloging your library and lending out books!</p>

        <h3>Demo Account</h3>
        <p>If you'd like to demo an account before signing up, use the following credentials to log in:</p>
        
        <ul>
          <li>Username: test-user</li>
          <li>Password: Password1!</li>
        </ul>

        <p>Then play around with the app to learn its functionality! Enjoy!</p>
      </section>
    )
  }
}

export default LandingPageRoute;