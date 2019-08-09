import React, { Component } from 'react';
import Container from 'react-bootstrap/es/Container';
import { Header } from './Header';
import { Map } from './Map';
import './App.scss';

export class App extends Component {
  render() {
    return (
      <Container
        fluid={true}
        className={
          ['vh-100', 'd-flex', 'flex-column'].join(' ')
          /*TODO: in real life, use "classnames" npm package instead of simple joining*/
        }
      >
        <Header className={'header'} />
        <Map className={'map'} />
      </Container>
    );
  }
}
