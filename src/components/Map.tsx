import React, { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { API, ChargingPoint } from '../helpers/api';
import './Map.scss';
import greenMarker from '../static/marker-green.svg';
import unknownMarker from '../static/marker-unknown.svg';
import clusterMarker from '../static/marker-cluster.svg';
import MarkerClusterer from '@google/markerclustererplus';
import { ErrorMessage } from './presentational/ErrorMessage';

export interface Props {
  className: string;
}

interface State {
  errorMessage?: string;
  test: number;
}

class Map extends PureComponent<Props, State> {
  state: Readonly<State> = {
    test: 0,
  };
  private googleMap: google.maps.Map;
  private googleMapRef: RefObject<HTMLDivElement> = createRef();
  private chargingPoints: ChargingPoint[] = [];

  async componentDidMount(): Promise<void> {
    try {
      this.chargingPoints = await new API().getChargingPoints();
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
    const markers = this.chargingPoints.map((chargingPoint: ChargingPoint) => {
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
          width: 30,
          height: 30,
          url: clusterMarker,
          textColor: 'white',
          textSize: 12,
          fontWeight: 'normal',
          fontFamily: 'inherit',
        },
      ],
    });
    if (this.chargingPoints.length > 0) {
      this.googleMap.fitBounds(bounds);
    }
  };

  createGoogleMap = (): google.maps.Map =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 11,
      center: {
        lat: 52.3545362,
        lng: 4.8949981,
      },
    });

  render(): ReactNode {
    const { errorMessage } = this.state;

    return (
      <main className={this.props.className}>
        <ErrorMessage className={'map-error'} errorMessage={errorMessage} />
        <div id="google-map" ref={this.googleMapRef} />
      </main>
    );
  }
}

export { Map as default };
