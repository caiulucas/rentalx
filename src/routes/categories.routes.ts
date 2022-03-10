import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { importCategoryController } from '../modules/cars/useCases/ImportCategory';
import { listCategoriesController } from '../modules/cars/useCases/ListCategories';

const upload = multer({ dest: './tmp' });

export const categoriesRoutes = Router();

categoriesRoutes.get('/', (request, response) =>
  listCategoriesController.handle(request, response),
);

categoriesRoutes.post('/', (request, response) =>
  createCategoryController.handle(request, response),
);

categoriesRoutes.post('/import', upload.single('file'), (request, response) =>
  importCategoryController.handle(request, response),
);
