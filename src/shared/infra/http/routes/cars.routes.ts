import { Router } from 'express';
import multer from 'multer';

import upload from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/useCases/CreateCar/CreateCarController';
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '../../../../modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const uploadImages = multer(upload);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.post(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);
carsRoutes.get('/', listCarsController.handle);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImageController.handle
);
export { carsRoutes };
