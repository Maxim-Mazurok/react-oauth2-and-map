import React, { ReactElement } from 'react';
import { CustomerInformation } from '../../helpers/api';
import './UserInfo.scss';
import { testIDs } from '../../helpers/const';

export interface Props {
  customerInformation: CustomerInformation;
}

export function UserInfo(props: Props): ReactElement<Props> {
  return (
    <div className="welcome" data-testid={testIDs.userInfo}>
      Welcome,{' '}
      <strong>
        {props.customerInformation.firstName}{' '}
        {props.customerInformation.lastName}
      </strong>
    </div>
  );
}
