import * as fs from 'fs';
import * as path from 'path';

export const chargePoints = fs.readFileSync(
  // use sample JSON as a DataBase
  path.resolve(__dirname, '../../sample-json-charge-points.json'),
);
