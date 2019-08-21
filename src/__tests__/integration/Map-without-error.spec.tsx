import React from 'react';
import { render } from '@testing-library/react';
import { testIDs } from '../../helpers/const';
import { makeRequest } from '../../__mocks__/xhr.mock';
import { flushPromises } from '../helpers/flushPromises';

import { Map, Props } from '../../components/Map'; // should be imported only after all mocks

afterEach(() => {
  makeRequest.mockClear();
  document.getElementsByTagName('html')[0].innerHTML = ''; // to clean after document.createElement
});

test('Map renders without error', async () => {
  const props: Props = {
    className: 'map-test',
  };

  const { queryByTestId } = render(<Map {...props} />);

  await flushPromises(); // wait for getChargingPoints to finish

  const errorMessage = queryByTestId(testIDs.error);
  expect(errorMessage).toBeNull(); // error displayed
});
