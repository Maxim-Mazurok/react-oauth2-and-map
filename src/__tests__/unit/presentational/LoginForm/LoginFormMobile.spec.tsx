import React from 'react';
import {
  LoginFormMobile,
  Props as LoginFormMobileProps,
} from '../../../../components/presentational/LoginForm/LoginFormMobile';
import { Props as InputProps } from '../../../../components/presentational/LoginForm/Input';
import { Props as LoginFormDesktopProps } from '../../../../components/presentational/LoginForm/LoginFormDesktop';
import { toHaveAttribute } from '../../../helpers/toHaveAttribute';
import { render } from '@testing-library/react';
import { testIDs } from '../../../../helpers/const';

export const validateInputBlock = (
  container: HTMLElement,
  type: InputProps['type'],
  props: LoginFormMobileProps | LoginFormDesktopProps,
): void => {
  const block =
    type === 'password'
      ? container.querySelector('.password-submit')
      : container;

  expect(block).not.toBeNull();
  //  label
  const label = block.querySelector('label');
  expect(label).toBeNull();
  //  input
  const input = block.querySelector('input');
  expect(input).not.toBeNull();
  expect(input.hasAttribute('disabled')).toBe(props.disabled);
};

export const validateLoginFormMobile = (props: LoginFormMobileProps): void => {
  expect.extend({
    toHaveAttribute,
  });

  const { getByTestId, container } = render(<LoginFormMobile {...props} />);
  const button = getByTestId(testIDs.signIn);

  // validate email block
  validateInputBlock(container, 'email', props);

  // validate password block
  validateInputBlock(container, 'password', props);

  // validate sign in
  expect(button.hasAttribute('disabled')).toBe(props.disabled);
  expect(button.textContent).toBe('Sign In');
  expect(button).toHaveAttribute('type', 'submit');
};

describe('LoginFormMobile renders', () => {
  test('disabled', () => {
    validateLoginFormMobile({
      disabled: true,
    });
  });

  test('enabled', () => {
    validateLoginFormMobile({
      disabled: false,
    });
  });
});
