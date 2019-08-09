import React, { Component } from 'react';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import { LoginForm } from './LoginForm';
import { UserInfo } from './UserInfo';

export interface HeaderProps {
  className: string;
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
      <Row className={this.props.className}>
        <Col>
          <img
            src="https://my.newmotion.com/app/images/logo.svg"
            alt="myNewMotion"
          />
        </Col>
        <Col>{isLoggedIn ? <UserInfo /> : <LoginForm />}</Col>
      </Row>
    );
  }
}
