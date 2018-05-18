import { NextFunction, Request, RequestHandler, Response } from 'express';
import createError = require('http-errors');

const validateBoard: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body;

  // Easier to understand if we check for valid input rather than invalid input
  if (Array.isArray(payload) &&
      payload.length === 3 &&
      payload.every(el => Array.isArray(el) && el.length === 3)
  ) {
    return next();
  }

  next(new createError.BadRequest('Payload must be a 3x3 2-dimensional array'));
};

export default validateBoard;