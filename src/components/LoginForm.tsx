import React, { Component } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import Media from 'react-media';

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
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Media query={`(max-width: ${variables.totalHeaderTabletWidth})`}>
          {matches =>
            matches ? (
              <>
                <input
                  aria-label="E-mail"
                  id={'email'}
                  required={true}
                  type="email"
                  placeholder="E-mail"
                  onChange={this.handleEmailChange}
                />
                <div className={'password-submit'}>
                  <input
                    aria-label="Password"
                    required={true}
                    type="password"
                    placeholder={'Password'}
                    onChange={this.handlePasswordChange}
                  />
                  <button type="submit" onClick={this.validateForm}>
                    Sign In
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={'email'}>
                  <label htmlFor={'email'}>E-mail:</label>
                  <input
                    id={'email'}
                    required={true}
                    type="email"
                    placeholder="programming-assignment@newmotion.com"
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className={'password'}>
                  <label htmlFor={'password'}>Password:</label>
                  <input
                    id={'password'}
                    required={true}
                    type="password"
                    placeholder={'•'.repeat(8)}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <button type="submit" onClick={this.validateForm}>
                  Sign In
                </button>
              </>
            )
          }
        </Media>
      </form>
    );
  }
}
