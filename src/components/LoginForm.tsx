import React, { BaseSyntheticEvent, PureComponent, ReactNode } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import { AuthCredentials, getAccessToken } from '../helpers/oauth2';
import {
  CustomerInformation,
  getCustomerBasicInformation,
} from '../helpers/api';
import { ErrorMessage } from './presentational/ErrorMessage';
import {
  Props as LoginFormMobileProps,
  LoginFormMobile,
} from './presentational/LoginForm/LoginFormMobile';
import {
  Props as LoginFormDesktopProps,
  LoginFormDesktop,
} from './presentational/LoginForm/LoginFormDesktop';
import { inputs, testIDs } from '../helpers/const';
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

export class LoginForm extends PureComponent<Props, State> {
  state: Readonly<State> = {
    loading: false,
    mobile: mediaQuery.matches,
  };

  componentDidMount(): void {
    mediaQuery.addEventListener('change', (event: MediaQueryListEvent) => {
      this.setState({ mobile: event.matches });
    });
  }

  render(): ReactNode {
    const disabled = this.state.loading;
    const LoginForm: (
      props: LoginFormMobileProps | LoginFormDesktopProps,
    ) => JSX.Element = this.state.mobile ? LoginFormMobile : LoginFormDesktop;

    return (
      <>
        <form data-testid={testIDs.loginForm} onSubmit={this.handleSubmit}>
          <LoginForm disabled={disabled} />
          <ErrorMessage
            className="error"
            errorMessage={this.state.errorMessage}
          />
        </form>
      </>
    );
  }

  private static async login(
    credentials: AuthCredentials,
  ): Promise<CustomerInformation> {
    const token: string = await getAccessToken(credentials);
    return getCustomerBasicInformation(token);
  }

  private handleSubmit = (
    event: BaseSyntheticEvent<
      Event,
      EventTarget & HTMLFormElement,
      EventTarget & HTMLFormElement
    >,
  ): void => {
    event.preventDefault();
    this.setState({ loading: true });

    const elements: HTMLFormControlsCollection = event.target.elements;
    LoginForm.login({
      username: Utils.valuedById(elements, inputs.email.id),
      password: Utils.valuedById(elements, inputs.password.id),
    })
      .then((customerInformation: CustomerInformation) => {
        this.props.setCustomerInformation(customerInformation);
      })
      .catch((e: Error) =>
        this.setState({ errorMessage: e.message, loading: false }),
      );
  };
}
