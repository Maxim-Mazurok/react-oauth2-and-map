import React, { PureComponent, ReactElement } from 'react';
import { safariInputHack } from '../../../helpers/ios';

interface BaseProps {
  id: string;
  testId: string;
  disabled: boolean;
  type: 'password' | 'email';
  placeholder: string;
  hasLabel: boolean;
}

interface PropsWithLabel extends BaseProps {
  hasLabel: true;
  label: string;
}

interface PropsWithAriaLabel extends BaseProps {
  hasLabel: false;
  ariaLabel: string;
}

export type Props = PropsWithAriaLabel | PropsWithLabel;

export class Input extends PureComponent<Props> {
  render(): Array<ReactElement<Props>> {
    const { id, testId, disabled, type, placeholder } = this.props;

    return [
      this.props.hasLabel ? (
        <label key={`${id}-label`} htmlFor={id}>
          {this.props.label}
        </label>
      ) : null,
      <input
        {...(this.props.hasLabel === false
          ? { 'aria-label': this.props.ariaLabel }
          : {})}
        id={id}
        key={`${id}-input`}
        data-testid={testId}
        disabled={disabled}
        required={true}
        type={type}
        placeholder={placeholder}
        onBlur={safariInputHack}
      />,
    ];
  }
}
