import React from 'react';
import {
  render,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '../../__mocks__/window.mock';
import { login } from './helpers/login';
import { testData, testIDs } from '../../helpers/const';
import { makeRequest } from '../../__mocks__/xhr.mock';
import { Header } from '../../components/Header'; // should be imported only after all mocks

const flushPromises = (): Promise<NodeJS.Immediate> =>
  new Promise(setImmediate);

jest.setTimeout(10000000);

beforeEach(() => {
  jest.setTimeout(10000000);
});

afterEach(() => {
  [makeRequest].map(mock => mock.mockClear());
});

test('Login with valid credentials shows customer information', async () => {
  const { getByTestId, queryByTestId } = render(<Header />);

  login(
    {
      username: testData.email.valid,
      password: testData.password.valid,
    },
    getByTestId,
  ); // valid login

  await waitForElementToBeRemoved(() => queryByTestId(testIDs.loginForm)); // wait for login form to disappear

  const userInfo = await waitForElement(() => getByTestId(testIDs.userInfo)); // wait for user info to appear

  expect(userInfo.textContent).toMatch(/^Welcome, TestFirstName TestLastName$/); // contains welcome text
});

test('Login with invalid credentials shows error', async () => {
  const { getByTestId, queryAllByText } = render(<Header />);

  login(
    {
      username: testData.email.invalid,
      password: testData.password.invalid,
    },
    getByTestId,
  ); // invalid login

  await flushPromises(); // wait for async logging in to finish

  getByTestId(testIDs.loginForm); // login form did not disappear

  getByTestId(testIDs.error); // error popped up

  expect(queryAllByText(testData.invalidCredentialsError)).toHaveLength(1); // error text is present
});

test('Header without credentials', () => {});
