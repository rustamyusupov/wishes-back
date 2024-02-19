import url from 'url';
import path from 'path';
import { JSONFileSyncPreset } from 'lowdb/node';
import { LowSync } from 'lowdb/lib';

import { Data } from '../types';
import { defaultData } from './constants';

export const getData = (): LowSync<Data> => {
  const dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const dbPath = path.join(dirname, 'db.json');
  const db = JSONFileSyncPreset<Data>(dbPath, defaultData);

  return db;
};
