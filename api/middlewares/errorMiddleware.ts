// eslint-disable-next-line import/no-import-module-exports
import { Response } from 'express';

type ErrorHandlerTypes = {
  statusCode: number;
  status: string;
  message: string;
};

class ErrorHandler extends Error {
  statusCode: string | number;

  status: string;

  constructor(error: ErrorHandlerTypes, message: string) {
    const { statusCode, status } = error;
    super();
    this.statusCode = statusCode ?? '500';
    this.status = status ?? 'error';
    this.message = message ?? 'Something went wrong';
  }
}

const handleError = (err: ErrorHandlerTypes, res: Response) => {
  console.log('there is an error', err);
  const { statusCode, status, message } = err;
  return res.status(statusCode).json({
    statusCode,
    status,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
};
