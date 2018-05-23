import { NextFunction, Request, RequestHandler, Response } from 'express';
import createError = require('http-errors');
import Board from '../../common/board';

const parseInput: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = new Board(req.body);
  } catch (error) {
    return next(new createError.BadRequest(error.message));
  }

  return next();
};

export default parseInput;