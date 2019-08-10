import React, { Component } from 'react';
import './LoginForm.scss';

interface State {
  email: string;
  password: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
}

export class LoginForm extends Component<{}, State> {
  state = {
    email: '',
    password: '',
    emailErrorMessage: '',
    passwordErrorMessage: '',
  };

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  validateForm = () => {
    if (this.state.email.length === 0) {
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    //
    event.preventDefault();
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            E-mail:
            <input
              required={true}
              type="email"
              placeholder="programming-assignment@newmotion.com"
              onChange={this.handleEmailChange}
            />
          </label>
          {this.state.emailErrorMessage.length > 0 && (
            <span>{this.state.emailErrorMessage}</span>
          )}
        </div>

        <div>
          <label>
            Password:
            <input
              required={true}
              type="password"
              placeholder={'•'.repeat(8)}
              onChange={this.handlePasswordChange}
            />
          </label>
        </div>

        <button type="submit" onClick={this.validateForm}>
          Sign In
        </button>
      </form>
    );
  }
}
