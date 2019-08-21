import React from 'react';
import { render } from '@testing-library/react';
import { makeRequest } from '../../../../__mocks__/xhr.mock';
import {
  Props,
  SignIn,
} from '../../../../components/presentational/LoginForm/SignIn';
import { toHaveAttribute } from '../../../helpers/toHaveAttribute';
import { testIDs } from '../../../../helpers/const';

expect.extend({
  toHaveAttribute,
});

afterEach(() => {
  makeRequest.mockClear();
});

const validateSignIn = (props: Props): void => {
  const { getByTestId } = render(<SignIn {...props} />);
  const button = getByTestId(testIDs.signIn);

  // validate button
  expect(button.hasAttribute('disabled')).toBe(props.disabled);
  expect(button.textContent).toBe('Sign In');
  expect(button).toHaveAttribute('type', 'submit');
};

describe('SignIn renders', () => {
  test('disabled', () => {
    validateSignIn({
      disabled: true,
    });
  });

  test('enabled', () => {
    validateSignIn({
      disabled: false,
    });
  });
});
