import React, { Component } from 'react';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';
import './Header.scss';
import logo from './../static/logo.svg';
import { CustomerInformation } from '../helpers/api';

export interface HeaderProps {
  className?: string;
}

interface HeaderState {
  customerInformation?: CustomerInformation;
}

export class Header extends Component<HeaderProps, HeaderState> {
  isLoggedIn = () => {
    return (
      this.state !== null && this.state.hasOwnProperty('customerInformation')
    );
  };

  setCustomerInformation = (customerInformation: CustomerInformation) => {
    this.setState({ customerInformation });
  };

  render() {
    return (
      <header className={'header'}>
        <div className={'logo'} />
        {this.isLoggedIn() ? (
          <UserInfo customerInformation={this.state.customerInformation} />
        ) : (
          <LoginForm setCustomerInformation={this.setCustomerInformation} />
        )}
      </header>
    );
  }
}
