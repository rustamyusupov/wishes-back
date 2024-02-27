import url from 'url';
import path from 'path';
import fs from 'fs';

import { Data } from '../types';
import { defaultData } from './constants';

const dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(dirname, import.meta.env.WISHES_DB);

export const getData = (): Data => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);

    return defaultData;
  }
};

export const setData = (data: Data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync(dbPath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};
