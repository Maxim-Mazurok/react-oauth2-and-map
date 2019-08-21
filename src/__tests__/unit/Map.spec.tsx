import React from 'react';
import { render } from '@testing-library/react';
import { makeRequest } from '../../__mocks__/xhr.mock';

import { Map, Props } from '../../components/Map'; // should be imported only after all mocks

afterEach(() => {
  makeRequest.mockClear();
});

test('Map renders', async () => {
  const props: Props = {
    className: 'map-test',
  };

  const { container } = render(<Map {...props} />);

  const main = container.querySelector(`main.${props.className}`);
  expect(main).not.toBeNull(); // main exists and has className from props

  const googleMap = container.querySelector('.google-map');
  expect(googleMap).not.toBeNull(); // google-map exists
});
