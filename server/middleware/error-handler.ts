import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import * as log from 'fancy-log';

/**
 * An error handler for the XHR calls only
 * Errors in static assets should just use express standard built-in error handler
 * @param err
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  log.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).send(err.message);
};

export default errorHandler;