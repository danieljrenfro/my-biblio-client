import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/library');
  }

  render() {
    return (
      <section className="registration-page">
        <h2>Sign up</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;