import React from 'react';
import { render } from '@testing-library/react';
import { toHaveAttribute } from '../../../helpers/toHaveAttribute';
import { testIDs } from '../../../../helpers/const';
import {
  LoginFormDesktop,
  Props,
} from '../../../../components/presentational/LoginForm/LoginFormDesktop';
import { Props as InputProps } from '../../../../components/presentational/LoginForm/Input';

expect.extend({
  toHaveAttribute,
});

const validateInputBlock = (
  container: HTMLElement,
  type: InputProps['type'],
  props: Props,
) => {
  const block = container.querySelector(`.${type}`);
  expect(block).not.toBeNull();
  //  label
  const label = block.querySelector('label');
  expect(label).not.toBeNull();
  //  input
  const input = block.querySelector('input');
  expect(input).not.toBeNull();
  expect(input.hasAttribute('disabled')).toBe(props.disabled);
};

const validateLoginFormDesktop = (props: Props): void => {
  const { getByTestId, container } = render(<LoginFormDesktop {...props} />);
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

test('LoginFormDesktop disabled renders', () => {
  validateLoginFormDesktop({
    disabled: true,
  });
});

test('LoginFormDesktop enabled renders', () => {
  validateLoginFormDesktop({
    disabled: false,
  });
});
