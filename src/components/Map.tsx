import React, { Component } from 'react';
import Row from 'react-bootstrap/es/Row';
import Col from 'react-bootstrap/es/Col';
import GoogleMapReact, { Props as GoogleMapReactProps } from 'google-map-react';

export interface MapProps {
  className: string;
}

type RealMapProps = MapProps & GoogleMapReactProps;

export class Map extends Component<RealMapProps> {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      <Row className={[this.props.className, 'no-gutters'].join(' ')}>
        <Col>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.GOOGLE_MAPS_JS_API_KEY,
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          />
        </Col>
      </Row>
    );
  }
}
