import React, { PureComponent, ReactNode } from 'react';
import { LoginForm } from './LoginForm';
import { UserInfo } from './presentational/UserInfo';
import './Header.scss';
import { CustomerInformation } from '../helpers/api';
import { safariForceResize } from '../helpers/ios';

interface State {
  customerInformation?: CustomerInformation;
}

export class Header extends PureComponent<{}, State> {
  render(): ReactNode {
    safariForceResize();

    return (
      <header>
        <div className="logo" />
        {this.state ? (
          <UserInfo customerInformation={this.state.customerInformation} />
        ) : (
          <LoginForm setCustomerInformation={this.setCustomerInformation} />
        )}
      </header>
    );
  }

  private setCustomerInformation = (
    customerInformation: CustomerInformation,
  ): void => {
    this.setState({ customerInformation });
  };
}
