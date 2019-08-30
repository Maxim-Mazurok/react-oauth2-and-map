import React, { ReactElement } from 'react';
import { Header } from '../Header';
import './App.scss';
import { Map } from '../Map';

export function App(): ReactElement<{}> {
  return (
    <div className="app">
      <Header />
      <Map className="map" />
    </div>
  );
}
