import React, { Component } from 'react';
import Row from 'react-bootstrap/es/Row';
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
      <Row className={[this.props.className || '', 'no-gutters'].join(' ')}>
        <img id={'logo'} src={logo} alt="myNewMotion" />
        {isLoggedIn ? <UserInfo /> : <LoginForm />}
      </Row>
    );
  }
}
