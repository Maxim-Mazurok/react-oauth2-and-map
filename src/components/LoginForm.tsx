import React, { Component } from 'react';
import Form from 'react-bootstrap/es/Form';
import Button from 'react-bootstrap/es/Button';
import Col from 'react-bootstrap/es/Col';
import './LoginForm.scss';

export class LoginForm extends Component {
  render() {
    return (
      <Form>
        <Form.Row className={'align-items-end'}>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>

          <Col>
            <Button variant="primary" type="submit" className={'align-bottom'}>
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}
