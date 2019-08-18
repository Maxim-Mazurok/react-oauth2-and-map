import React, { BaseSyntheticEvent, Component, ReactNode } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import { AuthCredentials, OAuth2 } from '../helpers/oauth2';
import { API, CustomerInformation } from '../helpers/api';
import { LoginFormMobile } from './presentational/LoginForm/LoginFormMobile';
import { ErrorMessage } from './presentational/ErrorMessage';
import { LoginFormDesktop } from './presentational/LoginForm/LoginFormDesktop';
import { inputs } from '../helpers/const';
import { Utils } from '../helpers/utils';

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

  componentDidMount(): void {
    mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => {
      this.setState({ mobile: event.matches });
    });
  }

  login(credentials: AuthCredentials): void {
    this.setState({ loading: true });
    const auth = new OAuth2();
    auth
      .auth(credentials)
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

  handleSubmit = (
    event: BaseSyntheticEvent<
      Event,
      EventTarget & HTMLFormElement,
      EventTarget & HTMLFormElement
    >,
  ): void => {
    event.preventDefault();

    const elements: HTMLFormControlsCollection = event.target.elements;
    this.login({
      username: Utils.valuedById(elements, inputs.email.id),
      password: Utils.valuedById(elements, inputs.password.id),
    });
  };

  render(): ReactNode {
    const disabled = this.state.loading;
    const LoginForm = this.state.mobile ? LoginFormMobile : LoginFormDesktop;

    return (
      <>
        <form data-testid={'login-form'} onSubmit={this.handleSubmit}>
          <LoginForm disabled={disabled} />
          <ErrorMessage
            className={'error'}
            errorMessage={this.state.errorMessage}
          />
        </form>
      </>
    );
  }
}
