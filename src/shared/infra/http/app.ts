import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import { router } from './routes';

import '../../container';
import upload from '../../../config/upload';

export const app = express();
createConnection();
app.use(express.json());
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error ${err.message}`,
    });
  }
);