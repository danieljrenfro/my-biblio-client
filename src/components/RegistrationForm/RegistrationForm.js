import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';

import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  static contextType = UserContext;
  
  state = { error: null }

  firstInput = React.createRef();
  
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: null });
    
    const { name, username, password } = event.target;
    
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        AuthApiService.postLogin({
          username: username.value,
          password: password.value
        })
        .then(res => {
          this.context.processLogin(res.authToken);
          name.value = '';
          username.value = '';
          password.value = '';
          this.props.onRegistrationSuccess();
        })
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state;

    return(
      <>
        <form 
          onSubmit={(e) => this.handleSubmit(e)} className="registration-form"
        >
          <div className="error" role="alert">
            {error && <p>{error}</p>}
          </div>

          <label htmlFor="registration-name-input">Name*</label>
          <input 
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            type="text"
            required
          />

          <label htmlFor="registration-username-input">Username*</label>
          <input 
            id="registration-username-input"
            name="username"
            type="text"
            required
          />

          <label htmlFor="registration-password-input">Password*</label>
          <input 
            id="registration-password-input"
            name="password"
            type="password"
            required
          />

          <button className="btn" type="submit">Sign up</button>
        </form>
      </>
    )
  }
}

export default RegistrationForm;