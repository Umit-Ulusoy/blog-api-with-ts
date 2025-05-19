import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

type ValidatedRequest = Request & {
  validated?: {
    body?: any;
    query?: any;
  };
};

type SchemaWithOptionalRequest = {
  body?: AnyZodObject;
  query?: AnyZodObject;
};

export const validate = (schema: SchemaWithOptionalRequest) => async (
  req: ValidatedRequest,
  res: Response,
  next: NextFunction
) => {

  try {
    const validated: { body?: any; query?: any } = {};

    if (schema.body) {
      const result = await schema.body.safeParseAsync(req.body);
      if (!result.success) return next(result.error);
      validated.body = result.data;
    }

    if (schema.query) {
      const result = await schema.query.safeParseAsync(req.query);
      if (!result.success) return next(result.error);
      validated.query = result.data;
    }

    req.validated = validated;

    next();
  } catch (err) {
    next(err);
  }
};
