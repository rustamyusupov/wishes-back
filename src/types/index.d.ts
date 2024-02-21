import 'express';

import { Data } from './types';

declare module Express {
  export interface Response {
    locals: {
      models?: Data;
    };
  }
}
