import React from 'react';
import { render } from '@testing-library/react';
import '../../../__mocks__/window.mock';
import { App } from '../../../components/presentational/App';

test('App renders', () => {
  const { container } = render(<App />);

  expect(container.querySelectorAll('div.app > *')).toHaveLength(2); // App should have class "app" and 2 children (header + map)
});
