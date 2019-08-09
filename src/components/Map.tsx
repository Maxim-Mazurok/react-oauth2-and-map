import React, { Component } from 'react';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';

export interface MapProps {
  className: string;
}

export class Map extends Component<MapProps> {
  render() {
    return (
      <Row className={this.props.className}>
        <Col>map</Col>
      </Row>
    );
  }
}
