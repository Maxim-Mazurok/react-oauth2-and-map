import React, { Component, ReactNode } from 'react';
import { Header } from './Header';
import './App.scss';
import { Map } from './Map';

export class App extends Component {
  render(): ReactNode {
    return (
      <div className={'app'}>
        <Header />
        <Map className={'map'} />
      </div>
    );
  }
}
