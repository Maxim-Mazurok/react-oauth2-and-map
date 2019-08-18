import React from 'react';
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '../__mocks__/window.mock';
import { testData } from '../helpers/const';
import {
  API,
  getCustomerBasicInformation,
} from '../helpers/__mocks__/api.mock';
import { getAccessToken, OAuth2 } from '../helpers/__mocks__/oauth2.mock';
import { login } from '../helpers/__spec__/login';
import { Header } from './Header'; // should be imported only after all mocks

const flushPromises = (): Promise<NodeJS.Immediate> =>
  new Promise(setImmediate);

afterEach(() => {
  [API, OAuth2, getAccessToken, getCustomerBasicInformation].map(mock =>
    mock.mockClear(),
  );
});

test('Header with valid credentials', async () => {
  const { getByTestId, queryByTestId } = render(<Header />);

  login(
    {
      username: testData.email.valid,
      password: testData.password.valid,
    },
    getByTestId,
  ); // valid login

  await waitForElementToBeRemoved(() => queryByTestId('login-form')); // wait for login form to disappear

  const userInfo = await waitForElement(() => getByTestId('user-info')); // wait for user info to appear

  expect(userInfo.textContent).toMatch(/^Welcome, TestFirstName TestLastName$/); // contains welcome

  expect(OAuth2).toHaveBeenCalledTimes(1); // OAuth2 constructor
  expect(getAccessToken).toHaveBeenCalledTimes(1); // authentication
  expect(API).toHaveBeenCalledTimes(1); // API constructor
  expect(getCustomerBasicInformation).toHaveBeenCalledTimes(1); // getting basic customer information
});

test('Header with invalid credentials', async () => {
  const { getByTestId, queryAllByText } = render(<Header />);

  login(
    {
      username: testData.email.invalid,
      password: testData.password.invalid,
    },
    getByTestId,
  ); // invalid login

  await flushPromises();

  expect(getByTestId('login-form')).toBeTruthy(); // login form did not disappear

  expect(getByTestId('error')).toBeTruthy(); // error popped up
  expect(queryAllByText(testData.invalidCredentialsError)).toHaveLength(1); // error text is present

  expect(OAuth2).toHaveBeenCalledTimes(1); // OAuth2 constructor
  expect(getAccessToken).toHaveBeenCalledTimes(1); // authentication
  expect(getCustomerBasicInformation).not.toBeCalled(); // getting basic customer information
});

test('Header without credentials', () => {});
