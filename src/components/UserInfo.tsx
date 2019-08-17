import React from 'react';
import { CustomerInformation } from '../helpers/api';
import './UserInfo.scss';

interface Props {
  customerInformation: CustomerInformation;
}

export function UserInfo(props: Props): JSX.Element {
  return (
    <div className={'welcome'} data-testid={'user-info'}>
      Welcome,{' '}
      <strong>
        {props.customerInformation.firstName}{' '}
        {props.customerInformation.lastName}
      </strong>
    </div>
  );
}
