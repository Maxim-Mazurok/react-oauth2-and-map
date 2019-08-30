import React, { PureComponent, ReactElement } from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

export interface Props {
  disabled: boolean;
}

export class LoginFormDesktop extends PureComponent<Props> {
  render(): Array<ReactElement<Props>> {
    const { disabled } = this.props;

    return [
      <div key="email" className="email">
        <Input
          hasLabel={true}
          disabled={disabled}
          id={inputs.email.id}
          testId={inputs.email.testId}
          label={`${inputs.email.label}:`}
          placeholder="programming-assignment@newmotion.com"
          type="email"
        />
      </div>,
      <div key="password" className="password">
        <Input
          hasLabel={true}
          disabled={disabled}
          id={inputs.password.id}
          testId={inputs.password.testId}
          label={`${inputs.password.label}:`}
          placeholder={'•'.repeat(8)}
          type="password"
        />
      </div>,
      <SignIn key="submit" disabled={disabled} />,
    ];
  }
}
