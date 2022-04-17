import 'reflect-metadata';

import '@database/index';
import 'shared/containers';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { AppError } from '@shared/errors/AppError';
import { routes } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use((err: Error, _: Request, response: Response) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      message: err.message,
    });

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log('Server is running on port 3333'));
