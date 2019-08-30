import React, { BaseSyntheticEvent, PureComponent, ReactNode } from 'react';
import './LoginForm.scss';
import variables from '../variables.scss';
import { AuthCredentials, getAccessToken } from '../helpers/oauth2';
import {
  CustomerInformation,
  getCustomerBasicInformation,
} from '../helpers/api';
import { ErrorMessage } from './presentational/ErrorMessage';
import { LoginFormMobile } from './presentational/LoginForm/LoginFormMobile';
import { LoginFormDesktop } from './presentational/LoginForm/LoginFormDesktop';
import { inputs, testIDs } from '../helpers/const';
import { Utils } from '../helpers/utils';
import { iOSSafari } from '../helpers/ios';

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

  private static async login(
    credentials: AuthCredentials,
  ): Promise<CustomerInformation> {
    const token: string = await getAccessToken(credentials);
    return getCustomerBasicInformation(token);
  }

  componentDidMount(): void {
    // TODO: addEventListener doesn't work in Safari for MediaQueryList, replace when it'll be supported
    // tslint:disable-next-line:deprecation
    mediaQuery.addListener((event: MediaQueryListEvent) => {
      this.setState({ mobile: event.matches });
    });
  }

  render(): ReactNode {
    const disabled = this.state.loading;
    const LoginForm = this.state.mobile ? LoginFormMobile : LoginFormDesktop;

    return (
      <form
        data-testid={testIDs.loginForm}
        onSubmit={this.handleSubmit}
        /* disable iOS validation message resulting in scrolling */
        noValidate={iOSSafari}
      >
        <LoginForm disabled={disabled} />
        <ErrorMessage
          className="error"
          errorMessage={this.state.errorMessage}
        />
      </form>
    );
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
