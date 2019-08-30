import React, { ReactElement } from 'react';
import { testIDs } from '../../../helpers/const';

export interface Props {
  disabled: boolean;
}

export function SignIn(props: Props): ReactElement<Props> {
  const { disabled } = props;
  return (
    <button data-testid={testIDs.signIn} disabled={disabled} type="submit">
      Sign In
    </button>
  );
}
