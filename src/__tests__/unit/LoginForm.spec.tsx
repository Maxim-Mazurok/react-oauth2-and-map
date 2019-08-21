import React from 'react';
import { render } from '@testing-library/react';
import '../../__mocks__/window.mock';
import { login } from '../helpers/login';
import { testData } from '../../helpers/const';
import { makeRequest } from '../../__mocks__/xhr.mock';
import { flushPromises } from '../helpers/flushPromises';

import { LoginForm, Props } from '../../components/LoginForm'; // should be imported only after all mocks

afterEach(() => {
  makeRequest.mockClear();
});

test('LoginForm renders', () => {
  const props: Props = {
    setCustomerInformation: jest.fn(),
  };

  render(<LoginForm {...props} />);
});

describe('LoginForm setCustomerInformation being called', () => {
  test('1 time with valid credentials', async () => {
    const props: Props = {
      setCustomerInformation: jest.fn(),
    };

    const { getByTestId } = render(<LoginForm {...props} />);

    login(
      {
        username: testData.email.valid,
        password: testData.password.valid,
      },
      getByTestId,
    ); // valid login

    await flushPromises();

    expect(props.setCustomerInformation).toHaveBeenCalledTimes(1);
  });

  test('0 times with invalid credentials', async () => {
    const props: Props = {
      setCustomerInformation: jest.fn(),
    };

    const { getByTestId } = render(<LoginForm {...props} />);

    login(
      {
        username: testData.email.invalid,
        password: testData.password.invalid,
      },
      getByTestId,
    ); // valid login

    await flushPromises();

    expect(props.setCustomerInformation).toHaveBeenCalledTimes(0);
  });
});
