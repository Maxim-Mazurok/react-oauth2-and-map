import React, { Component } from 'react';
import { CustomerInformation } from '../helpers/api';
import './UserInfo.scss';

interface Props {
  customerInformation: CustomerInformation;
}

export class UserInfo extends Component<Props> {
  render() {
    return (
      <div className={'welcome'}>
        Welcome,{' '}
        <strong>
          {this.props.customerInformation.firstName}{' '}
          {this.props.customerInformation.lastName}
        </strong>
      </div>
    );
  }
}
