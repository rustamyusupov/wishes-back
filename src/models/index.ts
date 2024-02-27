import fs from 'fs';

import { Data } from '../types';
import { defaultData } from './constants';

export const getData = (): Data => {
  try {
    const dbPath = new URL(import.meta.env.WISHES_DB, import.meta.url).pathname;
    console.log(dbPath);
    const data = fs.readFileSync(dbPath, 'utf8');

    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);

    return defaultData;
  }
};

export const setData = (data: Data) => {
  try {
    const dbPath = new URL(import.meta.env.WISHES_DB, import.meta.url).pathname;
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFileSync(dbPath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};
