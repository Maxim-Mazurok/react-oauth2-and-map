import React, { Component, ReactNode } from 'react';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';
import './Header.scss';
import { CustomerInformation } from '../helpers/api';

export interface Props {
  className?: string;
}

interface HeaderState {
  customerInformation?: CustomerInformation;
}

export class Header extends Component<Props, HeaderState> {
  isLoggedIn = (): boolean => {
    return (
      this.state !== null && this.state.hasOwnProperty('customerInformation')
    );
  };

  setCustomerInformation = (customerInformation: CustomerInformation): void => {
    this.setState({ customerInformation });
  };

  render(): ReactNode {
    const customerInformation = this.state
      ? this.state.customerInformation
      : null;

    return (
      <header className={'header'}>
        <div className={'logo'} />
        {this.isLoggedIn() ? (
          <UserInfo customerInformation={customerInformation} />
        ) : (
          <LoginForm setCustomerInformation={this.setCustomerInformation} />
        )}
      </header>
    );
  }
}
