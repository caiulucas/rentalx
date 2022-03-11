import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/CreateCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/ImportCategory/ImportCategoryController';
import { ListCategoriesController } from '../modules/cars/useCases/ListCategories/ListCategoriesController';

const upload = multer({ dest: './tmp' });

export const categoriesRoutes = Router();

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get('/', listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post('/', createCategoryController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle,
);
