import React, { PureComponent, ReactElement } from 'react';
import { Input } from './Input';
import { SignIn } from './SignIn';
import { inputs } from '../../../helpers/const';

export interface Props {
  disabled: boolean;
}

export class LoginFormMobile extends PureComponent<Props> {
  render(): Array<ReactElement<Props>> {
    const { disabled } = this.props;

    return [
      <Input
        hasLabel={false}
        disabled={disabled}
        key="email"
        id={inputs.email.id}
        testId={inputs.email.testId}
        ariaLabel={inputs.email.label}
        placeholder="E-mail"
        type="email"
      />,
      <div key="password" className="password-submit">
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
      </div>,
    ];
  }
}
