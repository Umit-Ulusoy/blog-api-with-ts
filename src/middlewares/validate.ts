import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validate = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const result = await schema.safeParseAsync(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  
  return next();
};
