import React from 'react';
import { render } from '@testing-library/react';
import {
  ErrorMessage,
  Props,
} from '../../../components/presentational/ErrorMessage';
import { toHaveAttribute } from '../../helpers/toHaveAttribute';
import { testIDs } from '../../../helpers/const';

expect.extend({
  toHaveAttribute,
});

describe('ErrorMessage renders', () => {
  test('with errorMessage', () => {
    const props: Props = {
      className: 'test-error',
      errorMessage: 'Test error message',
    };

    const { getByTestId } = render(<ErrorMessage {...props} />);
    const errorMessage = getByTestId(testIDs.error);

    expect(errorMessage).toHaveAttribute('class', props.className); // has className from props
    expect(errorMessage.textContent).toBe(props.errorMessage); // contains error text from props
  });
  test('without errorMessage', () => {
    const props: Props = {
      className: 'test-error',
    };

    const { queryByTestId } = render(<ErrorMessage {...props} />);
    expect(queryByTestId(testIDs.error)).toBeNull(); // no ErrorMessage when error text from props is not set
  });
  test('with empty errorMessage', () => {
    const props: Props = {
      className: 'test-error',
      errorMessage: '',
    };

    const { queryByTestId } = render(<ErrorMessage {...props} />);
    expect(queryByTestId(testIDs.error)).toBeNull(); // no ErrorMessage when error text from props is empty
  });
});
