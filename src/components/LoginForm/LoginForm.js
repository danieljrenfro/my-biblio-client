import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  static contextType = UserContext;

  state = { error: null }

  firstInput = React.createRef();

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = event.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      })
  }

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;

    return (
      <>
        <form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
          <div className="error" role='alert'>
            {error && <p>{error}</p>}
          </div>
          <label htmlFor="login-username-input">Username</label>
          <input 
            ref={this.firstInput}
            id="login-username-input" 
            name="username" 
            placeholder="Username"
            required
          />

          <label htmlFor="login-password-input">Password</label>
          <input
            id="login-password-input"
            name="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>
      </>
    )
  }
}

export default LoginForm;