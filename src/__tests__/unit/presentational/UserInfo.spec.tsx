import React from 'react';
import { render } from '@testing-library/react';
import { Props, UserInfo } from '../../../components/presentational/UserInfo';
import { toHaveAttribute } from '../../helpers/toHaveAttribute';
import { testData, testIDs } from '../../../helpers/const';

expect.extend({
  toHaveAttribute,
});

test('UserInfo renders', () => {
  const props: Props = {
    customerInformation: {
      externalId: 'xxxxxxxxxxxxxxx',
      email: testData.email.valid,
      country: 'Netherlands',
      locale: 'en_NL',
      lastName: testData.lastName,
      firstName: testData.firstName,
      id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      countryCode: 'nl',
      status: 'active',
      _links: {
        self: {
          href: '/v1/customers/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        },
        'charge-session-history': {
          href:
            '/v1/charge-session-history?jwt=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        },
        'mailing-lists': {
          href:
            '/v1/customers/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/mailing-lists',
        },
      },
    },
  };

  const { getByTestId } = render(<UserInfo {...props} />);
  const userInfo = getByTestId(testIDs.userInfo);

  expect(userInfo).toHaveAttribute('class', 'welcome'); // has "welcome" class
  expect(userInfo.textContent).toMatch(/^Welcome, TestFirstName TestLastName$/); // contains welcome text
});
