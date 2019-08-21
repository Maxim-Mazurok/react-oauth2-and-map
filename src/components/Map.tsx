import React, { createRef, PureComponent, ReactNode, RefObject } from 'react';
import { getChargingPoints, ChargingPoint } from '../helpers/api';
import './Map.scss';
import greenMarker from '../static/marker-green.svg';
import unknownMarker from '../static/marker-unknown.svg';
import clusterMarker from '../static/marker-cluster.svg';
import { ErrorMessage } from './presentational/ErrorMessage';

export interface Props {
  className: string;
}

interface State {
  errorMessage?: string;
}

const markerSize = 30;

export class Map extends PureComponent<Props, State> {
  private googleMap: google.maps.Map;
  private googleMapRef: RefObject<HTMLDivElement> = createRef();
  private chargingPoints: ChargingPoint[] = [];

  async componentDidMount(): Promise<void> {
    await Promise.all([this.loadGoogleMap(), this.loadChargingPoints()]);
    this.createMarkers();
  }

  render(): ReactNode {
    return (
      <main className={this.props.className}>
        {this.state && (
          <ErrorMessage
            className="map-error"
            errorMessage={this.state.errorMessage}
          />
        )}
        <div className="google-map" ref={this.googleMapRef} />
      </main>
    );
  }

  private async loadChargingPoints(): Promise<void> {
    try {
      this.chargingPoints = await getChargingPoints();
    } catch (e) {
      this.setState({ errorMessage: 'Failed to get charging points' });
    }
  }

  private loadGoogleMap = (): Promise<void> => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_JS_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    return new Promise<void>((resolve): void => {
      googleMapScript.addEventListener('load', () => {
        this.googleMap = this.createGoogleMap();
        resolve();
      });
    });
  };

  private createMarkers = (): void => {
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
          size: new google.maps.Size(markerSize, markerSize),
          scaledSize: new google.maps.Size(markerSize, markerSize),
          url:
            chargingPoint.city === 'Adresgegevens nog niet verwerkt'
              ? unknownMarker
              : greenMarker,
        },
        map: this.googleMap,
      });
    });
    import('@google/markerclustererplus').then(
      (markerClusterer: { default: typeof MarkerClusterer }) => {
        new markerClusterer.default(this.googleMap, markers, {
          styles: [
            {
              width: markerSize,
              height: markerSize,
              url: clusterMarker,
              textColor: 'white',
              textSize: 12,
              fontWeight: 'normal',
              fontFamily: 'inherit',
            },
          ],
        });
      },
    );
    if (this.chargingPoints.length > 0) {
      this.googleMap.fitBounds(bounds);
    }
  };

  private createGoogleMap = (): google.maps.Map =>
    new window.google.maps.Map(this.googleMapRef.current);
}
