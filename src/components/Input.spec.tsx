import React from 'react';
import { Input, InputProps } from './Input';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';

test('Input renders and changes', () => {
  const inputTestProps: InputProps = {
    handleChange: event => (inputTestProps.value = event.target.value),
    id: 'test-id',
    label: 'test-label',
    text: 'test-text',
    type: 'text',
    value: 'test-value',
  };

  // test render snapshot
  const { asFragment, container } = render(<Input {...inputTestProps} />);
  expect(asFragment()).toMatchSnapshot();

  // test that id property is set
  let input = container.querySelector('input');
  expect(input).toHaveProperty('id', inputTestProps.id);

  // test changing value of input
  const testChangeValue = 'changed-test-value';
  fireEvent.change(input, { target: { value: testChangeValue } });
  input = render(<Input {...inputTestProps} />).container.querySelector(
    'input',
  );
  expect(input.value).toBe(testChangeValue);
});
