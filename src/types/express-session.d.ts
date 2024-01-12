import { User } from './types';

declare module 'express-session' {
  export interface SessionData {
    user?: User['id'];
  }
}
