import React from 'react';
import { testIDs } from '../../../helpers/const';

export interface Props {
  disabled: boolean;
}

export function SignIn(props: Props): JSX.Element {
  const { disabled } = props;
  return (
    <button data-testid={testIDs.signIn} disabled={disabled} type="submit">
      Sign In
    </button>
  );
}
