import React, { ReactElement } from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

export interface Props {
  disabled: boolean;
}

export function LoginFormDesktop(props: Props): ReactElement<Props> {
  const { disabled } = props;

  return (
    <>
      <div className="email">
        <Input
          hasLabel={true}
          disabled={disabled}
          id={inputs.email.id}
          testId={inputs.email.testId}
          label={`${inputs.email.label}:`}
          placeholder="programming-assignment@newmotion.com"
          type="email"
        />
      </div>
      <div className="password">
        <Input
          hasLabel={true}
          disabled={disabled}
          id={inputs.password.id}
          testId={inputs.password.testId}
          label={`${inputs.password.label}:`}
          placeholder={'•'.repeat(8)}
          type="password"
        />
      </div>
      <SignIn disabled={disabled} />
    </>
  );
}
