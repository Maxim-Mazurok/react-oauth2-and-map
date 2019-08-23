import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http'; // eslint-disable-line import/no-duplicates
import { IncomingMessage, ServerResponse } from 'http'; // eslint-disable-line import/no-duplicates
import { chargePoints } from './helpers/chargePoints';

const createServer = (): void => {
  http
    .createServer((req: IncomingMessage, res: ServerResponse) => {
      res.writeHead(200, 'OK', {
        // enable CORS
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      });
      res.write(chargePoints);
      res.end();
    })
    .listen(process.env.CHARGING_POINTS_API_ENDPOINT_PORT);
};

if (process.env.NODE_ENV !== 'production') {
  const env = fs.readFileSync(path.resolve(__dirname, '../.env')).toString();
  const regex = /CHARGING_POINTS_API_ENDPOINT_PORT\s*=\s*(\d+)/gm;
  process.env.CHARGING_POINTS_API_ENDPOINT_PORT = regex.exec(env)[1];
}

createServer();
