import React, { Component } from 'react';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';
import './Header.scss';
import logo from './../static/logo.svg';

export interface HeaderProps {
  className?: string;
}

interface HeaderState {
  isLoggedIn: boolean;
}

export class Header extends Component<HeaderProps, HeaderState> {
  state = {
    isLoggedIn: false,
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <div className={'header'}>
        <img id={'logo'} src={logo} alt="myNewMotion" />
        {isLoggedIn ? <UserInfo /> : <LoginForm />}
      </div>
    );
  }
}
