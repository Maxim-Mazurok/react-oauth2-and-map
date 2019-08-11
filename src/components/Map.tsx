import React, { Component } from 'react';
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
      <main className={this.props.className}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_MAPS_JS_API_KEY,
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        />
      </main>
    );
  }
}
