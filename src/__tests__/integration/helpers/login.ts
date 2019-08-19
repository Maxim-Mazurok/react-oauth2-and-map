import { AuthCredentials } from '../../../helpers/oauth2';
import {
  BoundFunction,
  fireEvent,
  GetByBoundAttribute,
} from '@testing-library/dom';
import { testIDs } from '../../../helpers/const';

export const getFormControls = (
  getByTestId: BoundFunction<GetByBoundAttribute>,
): {
  button: HTMLButtonElement;
  email: HTMLButtonElement;
  password: HTMLButtonElement;
} => {
  const button = getByTestId(testIDs.signIn) as HTMLButtonElement;
  const email = getByTestId(testIDs.email) as HTMLInputElement;
  const password = getByTestId(testIDs.password) as HTMLInputElement;
  return { button, email, password };
};

export const login = (
  credentials: AuthCredentials,
  getByTestId: BoundFunction<GetByBoundAttribute>,
): void => {
  const { button, email, password } = getFormControls(getByTestId); // all form controls are present

  // type test credentials
  fireEvent.change(email, {
    target: { value: credentials.username },
  });
  fireEvent.change(password, {
    target: { value: credentials.password },
  });

  fireEvent.click(button); // login
};
