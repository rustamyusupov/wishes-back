import url from 'url';
import path from 'path';
import { JSONFilePreset } from 'lowdb/node';

import { Data } from 'types';
import { defaultData } from './constants';
import { Low } from 'lowdb/lib';

export const getData = async (): Promise<Low<Data>> => {
  const dirname = path.dirname(url.fileURLToPath(import.meta.url));
  const dbPath = path.join(dirname, 'db.json');
  const db = await JSONFilePreset<Data>(dbPath, defaultData);

  return db;
};
