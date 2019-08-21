import React from 'react';
import { safariInputHack } from '../../../helpers/ios';

interface BaseProps {
  id: string;
  testId: string;
  disabled: boolean;
  type: 'password' | 'email';
  placeholder: string;
  hasLabel: boolean;
}

interface PropsWithLabel extends BaseProps {
  hasLabel: true;
  label: string;
}

interface PropsWithAriaLabel extends BaseProps {
  hasLabel: false;
  ariaLabel: string;
}

export type Props = PropsWithAriaLabel | PropsWithLabel;

export function Input(props: Props): JSX.Element {
  const { id, testId, disabled, type, placeholder } = props;

  return (
    <>
      {props.hasLabel && <label htmlFor={id}>{props.label}</label>}
      <input
        {...(props.hasLabel === false ? { 'aria-label': props.ariaLabel } : {})}
        id={id}
        data-testid={testId}
        disabled={disabled}
        required={true}
        type={type}
        placeholder={placeholder}
        onBlur={safariInputHack}
      />
    </>
  );
}
