import React from 'react';

interface BaseProps {
  id: string;
  testId: string;
  disabled: boolean;
  type: 'password' | 'email';
  placeholder: string;
}

interface PropsWithLabel extends BaseProps {
  label: string;
}
interface PropsWithAriaLabel extends BaseProps {
  ariaLabel: string;
}

export function Input(props: PropsWithAriaLabel | PropsWithLabel): JSX.Element {
  const { id, testId, disabled, type, placeholder } = props;
  const label = props.hasOwnProperty('label')
    ? (props as PropsWithLabel).label
    : false;
  const ariaLabel = props.hasOwnProperty('ariaLabel')
    ? (props as PropsWithAriaLabel).ariaLabel
    : false;
  const inputProps = ariaLabel ? { ariaLabel } : {};

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        {...inputProps}
        id={id}
        data-testid={testId}
        disabled={disabled}
        required={true}
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}
