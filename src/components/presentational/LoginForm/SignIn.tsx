import React from 'react';

export interface Props {
  disabled: boolean;
}

export function SignIn(props: Props): JSX.Element {
  const { disabled } = props;
  return (
    <button data-testid={'sign-in'} disabled={disabled} type="submit">
      Sign In
    </button>
  );
}
