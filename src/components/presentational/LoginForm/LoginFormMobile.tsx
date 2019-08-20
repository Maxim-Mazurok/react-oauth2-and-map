import React from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

interface Props {
  disabled: boolean;
}

export function LoginFormMobile(props: Props): JSX.Element {
  const { disabled } = props;

  return (
    <>
      <Input
        hasLabel={false}
        disabled={disabled}
        id={inputs.email.id}
        testId={inputs.email.testId}
        ariaLabel={inputs.email.label}
        placeholder="E-mail"
        type="email"
      />
      <div className={'password-submit'}>
        <Input
          hasLabel={false}
          disabled={disabled}
          id={inputs.password.id}
          testId={inputs.password.testId}
          ariaLabel={inputs.password.label}
          placeholder="Password"
          type="password"
        />
        <SignIn disabled={disabled} />
      </div>
    </>
  );
}
