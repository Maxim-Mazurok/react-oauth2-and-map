import React from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

interface Props {
  disabled: boolean;
  errorMessage?: string;
}

export function LoginFormMobile(props: Props): JSX.Element {
  const { disabled } = props;

  return (
    <>
      <Input
        id={inputs.email.id}
        label={inputs.email.label}
        disabled={disabled}
        showLabel={false}
        type="email"
        placeholder="E-mail"
      />
      <div className={'password-submit'}>
        <Input
          id={inputs.password.id}
          label={inputs.password.label}
          disabled={disabled}
          showLabel={false}
          type="password"
          placeholder={'Password'}
        />
        <SignIn disabled={disabled} />
      </div>
    </>
  );
}
