import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body?: any;
        query?: any;
      };
    }
  }
}

export {};
