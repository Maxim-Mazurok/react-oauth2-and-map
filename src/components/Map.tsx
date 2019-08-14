import React, { Component, createRef, RefObject } from 'react';
import { API, ChargingPoint } from '../helpers/api';
import './Map.scss';
import greenMarker from '../static/marker-green.svg';
import unknownMarker from '../static/marker-unknown.svg';
import clusterMarker from '../static/marker-cluster.svg';
import MarkerClusterer from '@google/markerclusterer';

export interface Props {
  className: string;
}

interface State {
  chargingPoints: ChargingPoint[];
  errorMessage?: string;
}

export class Map extends Component<Props, State> {
  state: State = {
    chargingPoints: [],
  };
  googleMap: google.maps.Map;
  googleMapRef: RefObject<HTMLDivElement> = createRef();

  async componentDidMount() {
    try {
      this.setState({ chargingPoints: await new API().getChargingPoints() });
    } catch (e) {
      this.setState({ errorMessage: 'Failed to get charging points' });
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_JS_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();
      this.createMarkers();
    });
  }

  createMarkers = (): void => {
    const bounds = new google.maps.LatLngBounds();
    const markers = this.state.chargingPoints.map(chargingPoint => {
      bounds.extend(
        new window.google.maps.LatLng(chargingPoint.lat, chargingPoint.lng),
      );
      return new window.google.maps.Marker({
        position: {
          lat: chargingPoint.lat,
          lng: chargingPoint.lng,
        },
        icon: {
          size: new google.maps.Size(30, 30),
          scaledSize: new google.maps.Size(30, 30),
          url:
            chargingPoint.city === 'Adresgegevens nog niet verwerkt'
              ? unknownMarker
              : greenMarker,
        },
        map: this.googleMap,
      });
    });
    new MarkerClusterer(this.googleMap, markers, {
      styles: [
        {
          width: 50,
          height: 50,
          url: clusterMarker,
          textColor: 'white',
        },
      ],
    });
    if (this.state.chargingPoints.length > 0) {
      this.googleMap.fitBounds(bounds);
    }
  };

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 11,
      center: {
        lat: 52.3545362,
        lng: 4.8949981,
      },
    });

  render() {
    return (
      <main className={this.props.className}>
        {this.state.errorMessage && (
          <div className={'map-error'}>{this.state.errorMessage}</div>
        )}
        <div id="google-map" ref={this.googleMapRef} />
      </main>
    );
  }
}
