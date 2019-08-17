import React from 'react';

export interface Props {
  showLabel: boolean;
  id: string;
  disabled: boolean;
  label: string;
  type: 'password' | 'email';
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: Props): JSX.Element {
  const { id, disabled, label, type, showLabel, placeholder, onChange } = props;

  return (
    <>
      {showLabel && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        data-testid={id}
        disabled={disabled}
        aria-label={label}
        required={true}
        type={type}
        placeholder={showLabel ? placeholder : label}
        onChange={onChange}
      />
    </>
  );
}
