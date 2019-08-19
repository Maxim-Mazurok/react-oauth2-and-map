import React, { PureComponent, ReactNode } from 'react';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';
import './Header.scss';
import { CustomerInformation } from '../helpers/api';

export interface Props {
  className?: string;
}

interface State {
  customerInformation?: CustomerInformation;
}

export class Header extends PureComponent<Props, State> {
  private get isLoggedIn(): boolean {
    return (
      this.state !== null && this.state.hasOwnProperty('customerInformation')
    );
  }

  render(): ReactNode {
    const customerInformation = this.state
      ? this.state.customerInformation
      : null;

    return (
      <header className={'header'}>
        <div className={'logo'} />
        {this.isLoggedIn ? (
          <UserInfo customerInformation={customerInformation} />
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
