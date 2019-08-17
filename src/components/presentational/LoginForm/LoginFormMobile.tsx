import React from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';

interface Props {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  errorMessage?: string;
}

export function LoginFormMobile(props: Props): JSX.Element {
  const { disabled, handleEmailChange, handlePasswordChange } = props;

  return (
    <>
      <Input
        disabled={disabled}
        id={'email'}
        showLabel={false}
        label="E-mail"
        type="email"
        placeholder="E-mail"
        onChange={handleEmailChange}
      />
      <div className={'password-submit'}>
        <Input
          disabled={disabled}
          id={'password'}
          showLabel={false}
          label="Password"
          type="password"
          placeholder={'Password'}
          onChange={handlePasswordChange}
        />
        <SignIn disabled={disabled} />
      </div>
    </>
  );
}
