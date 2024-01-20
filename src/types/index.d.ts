import 'express';

import { Data } from './types';
import { Low } from 'lowdb/lib';

declare module Express {
  export interface Response {
    locals: {
      models?: Low<Data>;
    };
  }
}
