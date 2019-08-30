import React, { ReactElement } from 'react';
import { testIDs } from '../../helpers/const';

export interface Props {
  className: string;
  errorMessage?: string;
}

export function ErrorMessage(props: Props): ReactElement<Props> {
  return props.errorMessage ? (
    <div data-testid={testIDs.error} className={props.className}>
      {props.errorMessage}
    </div>
  ) : null;
}
