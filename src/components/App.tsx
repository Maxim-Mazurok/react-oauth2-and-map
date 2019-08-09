import React, { Component } from 'react';
import { Header } from './Header';
import './App.scss';
import { Map } from './Map';

export class App extends Component {
  render() {
    return (
      <div
        className={[
          'no-gutter-fluid-container', // TODO: in real life, use "classnames" npm package instead of simple joining
          'vh-100',
          'd-flex',
          'flex-column',
        ].join(' ')}
      >
        <Header />
        <Map className={'h-100'} />
      </div>
    );
  }
}
