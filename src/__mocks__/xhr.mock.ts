import { config, testData } from '../helpers/const';
import { makeRequest as makeRequestOriginal } from '../helpers/xhr';
import { chargePoints } from '../helpers/chargePoints';

export const makeRequest = jest
  .fn<
    ReturnType<typeof makeRequestOriginal>,
    Parameters<typeof makeRequestOriginal>
  >()
  .mockImplementation((params: Parameters<typeof makeRequestOriginal>[0]) => {
    const { url, method, headers, body } = params;
    switch (url) {
      case `${config.endpoint}/access_token`:
        if (headers['Content-Type'] !== 'application/x-www-form-urlencoded') {
          return Promise.reject(
            '{"error":"invalid_request","error_description":"required parameter: grant_type"}',
          );
        } else if (
          headers['Authorization'] !==
          `Basic ${btoa(`${config.httpAuth.id}:${config.httpAuth.secret}`)}`
        ) {
          return Promise.reject(
            '{"error":"invalid_request","error_description":"Client credential is not found"}',
          );
        } else if (method !== 'POST') {
          return Promise.reject('');
        } else if (body.get('grant_type') !== 'password') {
          return Promise.reject(
            '{"error":"invalid_client","error_description":"Invalid client or client is not authorized"}',
          );
        } else if (
          body.get('username') === testData.email.valid &&
          body.get('password') === testData.password.valid
        ) {
          return Promise.resolve(
            '{"token_type":"Bearer","access_token":"fake-access-token","expires_in":3600,"refresh_token":"fake-refresh-token"}',
          );
        } else {
          return Promise.reject(
            `{"error":"invalid_grant","error_description":"${testData.invalidCredentialsError}"}`,
          );
        }
      case `${config.userEndpoint}/me`:
        return Promise.resolve(
          `
          {
            "externalId": "xxxxxxxxxxxxxxx",
            "email": "${testData.email.valid}",
            "country": "Netherlands",
            "locale": "en_NL",
            "lastName": "${testData.lastName}",\n  "firstName": "${testData.firstName}",\n  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "countryCode": "nl",
            "status": "active",
            "_links": {
              "self": {
                "href": "/v1/customers/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              },
              "charge-session-history": {
                "href": "/v1/charge-session-history?jwt=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              },
              "mailing-lists": {
                "href": "/v1/customers/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/mailing-lists"
              }
            }
          }`,
        );
      case `${config.chargingPointsEndpoint}`:
        return Promise.resolve(chargePoints.toString());
      default:
        return Promise.reject(new Error('Unknown URL requested'));
    }
  });

jest.mock('../helpers/xhr.ts', () => ({
  makeRequest,
}));
