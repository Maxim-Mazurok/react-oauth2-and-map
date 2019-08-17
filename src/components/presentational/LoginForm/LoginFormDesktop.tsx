import React from 'react';
import { SignIn } from './SignIn';
import { Input } from './Input';
import { inputs } from '../../../helpers/const';

interface Props {
  disabled: boolean;
  errorMessage?: string;
}

export function LoginFormDesktop(props: Props): JSX.Element {
  const { disabled } = props;

  return (
    <>
      <div className={'email'}>
        <Input
          id={inputs.email.id}
          label={`${inputs.email.label}:`}
          showLabel={true}
          disabled={disabled}
          type="email"
          placeholder="programming-assignment@newmotion.com"
        />
      </div>
      <div className={'password'}>
        <Input
          id={inputs.password.id}
          label={`${inputs.password.label}:`}
          showLabel={true}
          disabled={disabled}
          type="password"
          placeholder={'•'.repeat(8)}
        />
      </div>
      <SignIn disabled={disabled} />
    </>
  );
}
