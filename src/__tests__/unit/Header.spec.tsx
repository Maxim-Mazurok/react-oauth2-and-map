import React from 'react';
import { render } from '@testing-library/react';
import '../../__mocks__/window.mock';
import { Header } from '../../components/Header';

test('Header renders', () => {
  const { container } = render(<Header />);

  expect(container.querySelector('header')).not.toBeNull(); // header should be present
  expect(container.querySelector('header > div.logo')).not.toBeNull(); // logo should be present in header
  expect(container.querySelectorAll('header > *')).toHaveLength(2); // header should have 2 children (logo + UserInfo/LoginForm)
});
