import React from 'react';
import { render } from '@testing-library/react';
import '../../__mocks__/window.mock';
import { getFormControls, login } from '../helpers/login';
import { testData } from '../../helpers/const';
import { makeRequest } from '../../__mocks__/xhr.mock';
import { LoginForm, Props } from '../../components/LoginForm'; // should be imported only after all mocks

afterEach(() => {
  makeRequest.mockClear();
});

test('LoginForm controls are disabled while logging in', async () => {
  const props: Props = {
    setCustomerInformation: jest.fn(),
  };

  const { getByTestId } = render(<LoginForm {...props} />);

  const { button, email, password } = getFormControls(getByTestId); // all form controls are present

  login(
    {
      username: testData.email.valid,
      password: testData.password.valid,
    },
    getByTestId,
  ); // valid login

  // all form controls are disabled while logging in
  expect(button.disabled).toBe(true);
  expect(email.disabled).toBe(true);
  expect(password.disabled).toBe(true);
});
