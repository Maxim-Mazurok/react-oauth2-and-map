import React from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

interface Props {
  disabled: boolean;
}

export function LoginFormDesktop(props: Props): JSX.Element {
  const { disabled } = props;

  return (
    <>
      <div className={'email'}>
        <Input
          disabled={disabled}
          id={inputs.email.id}
          label={`${inputs.email.label}:`}
          placeholder="programming-assignment@newmotion.com"
          type="email"
        />
      </div>
      <div className={'password'}>
        <Input
          disabled={disabled}
          id={inputs.password.id}
          label={`${inputs.password.label}:`}
          placeholder={'•'.repeat(8)}
          type="password"
        />
      </div>
      <SignIn disabled={disabled} />
    </>
  );
}
