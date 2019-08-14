import React, { Component } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import Media from 'react-media';
import { OAuth2 } from '../helpers/oauth2';
import { API, CustomerInformation } from '../helpers/api';
import { Utils } from '../helpers/utils';

interface Props {
  setCustomerInformation: (customerInformation: CustomerInformation) => void;
}

interface State {
  email: string;
  password: string;
  loading: boolean;
  errorMessage?: string;
}

export class LoginForm extends Component<Props, State> {
  state: State = {
    email: '',
    password: '',
    loading: false,
  };

  login(): void {
    this.setState({ loading: true });
    const auth = new OAuth2();
    auth
      .auth({
        username: this.state.email,
        password: this.state.password,
      })
      .then(() => {
        const api = new API(auth.token);
        api
          .getCustomerBasicInformation()
          .then(customerInformation => {
            this.props.setCustomerInformation(customerInformation);
          })
          .catch(() => {
            this.setState({ errorMessage: 'Getting info failed' });
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      })
      .catch(e => {
        this.setState({
          errorMessage: e.hasOwnProperty('error_description')
            ? Utils.capitalize(e.error_description)
            : 'Auth failed',
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

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
    this.login();
  };

  render() {
    const disabled = this.state.loading;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Media query={`(max-width: ${variables.totalHeaderTabletWidth})`}>
            {matches =>
              matches ? (
                <>
                  <input
                    disabled={disabled}
                    aria-label="E-mail"
                    id={'email'}
                    required={true}
                    type="email"
                    placeholder="E-mail"
                    onChange={this.handleEmailChange}
                  />
                  <div className={'password-submit'}>
                    <input
                      disabled={disabled}
                      aria-label="Password"
                      required={true}
                      type="password"
                      placeholder={'Password'}
                      onChange={this.handlePasswordChange}
                    />
                    <button
                      disabled={disabled}
                      type="submit"
                      onClick={this.validateForm}
                    >
                      Sign In
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={'email'}>
                    <label htmlFor={'email'}>E-mail:</label>
                    <input
                      disabled={disabled}
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
                      disabled={disabled}
                      id={'password'}
                      required={true}
                      type="password"
                      placeholder={'•'.repeat(8)}
                      onChange={this.handlePasswordChange}
                    />
                  </div>
                  <button
                    disabled={disabled}
                    type="submit"
                    onClick={this.validateForm}
                  >
                    Sign In
                  </button>
                </>
              )
            }
          </Media>
          {this.state.errorMessage && (
            <div className={'error'}>{this.state.errorMessage}</div>
          )}
        </form>
      </>
    );
  }
}
