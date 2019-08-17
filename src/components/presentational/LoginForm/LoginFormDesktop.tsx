import React from 'react';
import { SignIn } from './SignIn';
import { Input } from './Input';

interface Props {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  errorMessage?: string;
}

export function LoginFormDesktop(props: Props): JSX.Element {
  const { disabled, handleEmailChange, handlePasswordChange } = props;

  return (
    <>
      <div className={'email'}>
        <Input
          id={'email'}
          label={'E-mail:'}
          showLabel={true}
          disabled={disabled}
          type="email"
          placeholder="programming-assignment@newmotion.com"
          onChange={handleEmailChange}
        />
      </div>
      <div className={'password'}>
        <Input
          id={'password'}
          label={'Password:'}
          showLabel={true}
          disabled={disabled}
          type="password"
          placeholder={'•'.repeat(8)}
          onChange={handlePasswordChange}
        />
      </div>
      <SignIn disabled={disabled} />
    </>
  );
}
