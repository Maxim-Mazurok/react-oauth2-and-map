import React, { Component, ReactNode } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import { OAuth2 } from '../helpers/oauth2';
import { API, CustomerInformation } from '../helpers/api';
import { LoginFormMobile } from './presentational/LoginForm/LoginFormMobile';
import { ErrorMessage } from './presentational/ErrorMessage';
import { LoginFormDesktop } from './presentational/LoginForm/LoginFormDesktop';

export interface Props {
  setCustomerInformation: (customerInformation: CustomerInformation) => void;
}

interface State {
  loading: boolean;
  mobile: boolean;
  errorMessage?: string;
}

const mediaQuery = window.matchMedia(
  `(max-width: ${variables.totalHeaderTabletWidth})`,
);

export class LoginForm extends Component<Props, State> {
  state: Readonly<State> = {
    loading: false,
    mobile: mediaQuery.matches,
  };
  private email = '';
  private password = '';

  componentDidMount(): void {
    mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => {
      this.setState({ mobile: event.matches });
    });
  }

  login(): void {
    this.setState({ loading: true });
    const auth = new OAuth2();
    auth
      .auth({
        username: this.email,
        password: this.password,
      })
      .then(() => {
        const api = new API(auth.token);
        api
          .getCustomerBasicInformation()
          .then(customerInformation => {
            this.props.setCustomerInformation(customerInformation);
          })
          .catch(() => {
            this.setState({
              errorMessage: 'Getting customer information failed',
              loading: false,
            });
          });
      })
      .catch((e: Error) => {
        this.setState({ errorMessage: e.message, loading: false });
      });
  }

  handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.email = event.target.value;
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.password = event.target.value;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.login();
  };

  render(): ReactNode {
    const disabled = this.state.loading;
    const LoginForm = this.state.mobile ? LoginFormMobile : LoginFormDesktop;

    return (
      <>
        <form data-testid={'login-form'} onSubmit={this.handleSubmit}>
          <LoginForm
            disabled={disabled}
            handleEmailChange={this.handleEmailChange}
            handlePasswordChange={this.handlePasswordChange}
            errorMessage={this.state.errorMessage}
          />
          <ErrorMessage
            className={'error'}
            errorMessage={this.state.errorMessage}
          />
        </form>
      </>
    );
  }
}
