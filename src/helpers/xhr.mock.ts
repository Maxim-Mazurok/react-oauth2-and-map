import { config, testData } from './const';
import { makeRequest as makeRequestOriginal } from './xhr';

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
          '{\n' +
            '  "externalId": "0015E00000a836H",\n' +
            '  "email": "programming-assignment@newmotion.com",\n' +
            '  "country": "Netherlands",\n' +
            '  "locale": "en_NL",\n' +
            `  "lastName": "${testData.lastName}",\n` +
            `  "firstName": "${testData.firstName}",\n` +
            '  "id": "dee0bcf4-ca1f-4f24-b551-c6b16e034063",\n' +
            '  "countryCode": "nl",\n' +
            '  "status": "active",\n' +
            '  "_links": {\n' +
            '    "self": {\n' +
            '      "href": "/v1/customers/dee0bcf4-ca1f-4f24-b551-c6b16e034063"\n' +
            '    },\n' +
            '    "charge-session-history": {\n' +
            '      "href": "/v1/charge-session-history?jwt=eyJhbGciOiJBMTI4S1ciLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.I3Uw8LdomObGfialh-rO2kpMnfaEkbweiUyCZXmZqHMWauJvvuNqvA.tEXFocW1QHuyaSuv-P3rNA.nHM85PqjR-YizLDEJeeEv2Hn-kxkoIf98pDNIvukytozdAjGwphDJmwxBo1mXGsNL0iZH3HMDhagOgYxijPG_E13vjqRWGHUjdDNvcJ4R6M.lXbC4zRi_BOjGIDml_x4nA"\n' +
            '    },\n' +
            '    "mailing-lists": {\n' +
            '      "href": "/v1/customers/dee0bcf4-ca1f-4f24-b551-c6b16e034063/mailing-lists"\n' +
            '    }\n' +
            '  }\n' +
            '}',
        );
      default:
        return Promise.reject(new Error('Unknown URL requested'));
    }
  });

jest.mock('./xhr', () => ({
  makeRequest,
}));
