import 'express';

import { Data } from './types';

declare module 'express' {
  export interface Response {
    locals: {
      models?: Data;
    };
  }
}
