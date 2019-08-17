import React from 'react';

interface Props {
  className?: string;
  errorMessage?: string;
}

export function ErrorMessage(props: Props): JSX.Element {
  return props.errorMessage ? (
    <div data-testid={'error'} className={props.className}>
      {props.errorMessage}
    </div>
  ) : null;
}
