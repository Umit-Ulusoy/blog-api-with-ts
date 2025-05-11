import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (
req: Request,
res: Response,
_next: NextFunction
): void => {
  res.status(404).json({
    status: false,
    message: `Page Not Found: ${req.method} ${req.originalUrl}`,
originalUrl: req.originalUrl
  });
};

export default notFoundHandler;
