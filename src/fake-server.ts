import * as http from 'http'; // eslint-disable-line import/no-duplicates
import { IncomingMessage, ServerResponse } from 'http'; // eslint-disable-line import/no-duplicates
import * as fs from 'fs';
import * as path from 'path';

const chargePoints = fs.readFileSync(
  path.resolve(__dirname, '../sample-json-charge-points.json'),
);

http
  .createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, 'OK', {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    });
    res.write(chargePoints);
    res.end();
  })
  .listen(8081);
