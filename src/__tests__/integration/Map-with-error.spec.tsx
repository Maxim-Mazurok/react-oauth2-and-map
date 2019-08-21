import React from 'react';
import { render } from '@testing-library/react';
import { testIDs } from '../../helpers/const';
import { getChargingPoints } from '../../__mocks__/api-getChargingPoints-failing.mock';
import { flushPromises } from '../helpers/flushPromises';

import { Map, Props } from '../../components/Map'; // should be imported only after all mocks

afterEach(() => {
  getChargingPoints.mockClear();
  document.getElementsByTagName('html')[0].innerHTML = ''; // to clean after document.createElement
});

test('Map renders with error for invalid request', async () => {
  const props: Props = {
    className: 'map-test',
  };

  const { getByTestId } = render(<Map {...props} />);

  await flushPromises(); // wait for getChargingPoints to finish

  const errorMessage = getByTestId(testIDs.error);
  expect(errorMessage).not.toBeNull(); // error is not displayed by default
});
