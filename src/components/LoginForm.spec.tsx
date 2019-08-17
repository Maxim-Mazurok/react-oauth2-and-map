import React from 'react';
import { render } from '@testing-library/react';
import '../__mocks__/window.mock';
import { auth, OAuth2 } from '../helpers/__mocks__/oauth2.mock';
import { getFormControls, login } from '../helpers/__spec__/login';
import { testData } from '../helpers/const';
import { LoginForm, Props } from './LoginForm'; // should be imported only after all mocks

afterEach(() => {
  [OAuth2, auth].map(x => x.mockClear());
});

test('LoginForm renders', async () => {
  const inputTestProps: Props = {
    setCustomerInformation: jest.fn(),
  };

  const { getByTestId } = render(<LoginForm {...inputTestProps} />);

  const { button, email, password } = getFormControls(getByTestId); // all form controls are present

  login(
    {
      username: testData.email.valid,
      password: testData.password.valid,
    },
    getByTestId,
  ); // valid login

  // all form controls are disabled while logging in
  expect(button.disabled).toBeTruthy();
  expect(email.disabled).toBeTruthy();
  expect(password.disabled).toBeTruthy();
});
