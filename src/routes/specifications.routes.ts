import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification/index';

export const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) =>
  createSpecificationController.handle(request, response),
);
