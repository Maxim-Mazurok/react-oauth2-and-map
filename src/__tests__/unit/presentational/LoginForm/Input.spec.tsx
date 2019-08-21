import React from 'react';
import { render } from '@testing-library/react';
import {
  Input,
  Props,
} from '../../../../components/presentational/LoginForm/Input';
import { toHaveAttribute } from '../../../helpers/toHaveAttribute';

expect.extend({
  toHaveAttribute,
});

const validateInput = (props: Props): void => {
  const { container, getByTestId } = render(<Input {...props} />);
  const input = getByTestId(props.testId);

  if (props.hasLabel) {
    // validate label
    const label = container.querySelector('label');
    expect(label).toHaveAttribute('for', props.id);
    expect(label.textContent).toBe(props.label);
  } else {
    expect(container.querySelector('label')).toBeNull();
  }

  // validate input
  expect(input).toHaveAttribute('id', props.id);
  expect(input.hasAttribute('disabled')).toBe(props.disabled);
  expect(input.hasAttribute('required')).toBe(true);
  expect(input).toHaveAttribute('type', props.type);
  expect(input).toHaveAttribute('placeholder', props.placeholder);
  if (props.hasLabel === false) {
    expect(input).toHaveAttribute('aria-label', props.ariaLabel);
  }
};

describe('Input renders', () => {
  describe('disabled', () => {
    test('with label', () => {
      validateInput({
        testId: 'firstTestId',
        disabled: true,
        id: 'firstId',
        hasLabel: true,
        label: 'firstLabel',
        placeholder: 'firstPlaceholder',
        type: 'email',
      });
    });
    test('without label', () => {
      validateInput({
        testId: 'secondTestId',
        disabled: true,
        id: 'secondId',
        hasLabel: false,
        ariaLabel: 'secondAriaLabel',
        placeholder: 'secondPlaceholder',
        type: 'email',
      });
    });
  });
  describe('enabled', () => {
    test('with label', () => {
      validateInput({
        testId: 'thirdTestId',
        disabled: false,
        id: 'thirdId',
        hasLabel: true,
        label: 'thirdLabel',
        placeholder: 'thirdPlaceholder',
        type: 'email',
      });
    });

    test('without label', () => {
      validateInput({
        testId: 'fourthTestId',
        disabled: false,
        id: 'fourthId',
        hasLabel: false,
        ariaLabel: 'fourthAriaLabel',
        placeholder: 'fourthPlaceholder',
        type: 'email',
      });
    });
  });
});
