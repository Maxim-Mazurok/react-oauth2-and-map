import { IncomingMessage, ServerResponse } from 'http';

const http = require('http');
const fs = require('fs');
const path = require('path');

const chargePoints = fs.readFileSync(
  path.join(__dirname, 'sample-json-charge-points.json'),
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
