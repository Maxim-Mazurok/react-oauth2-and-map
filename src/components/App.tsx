import React, { Component, ReactNode, Suspense } from 'react';
import { Header } from './Header';
import './App.scss';

const Map = React.lazy(() => import('./Map'));

export class App extends Component {
  render(): ReactNode {
    return (
      <div className={'app'}>
        <Header />
        <Suspense fallback={null}>
          <Map className={'map'} />
        </Suspense>
      </div>
    );
  }
}
