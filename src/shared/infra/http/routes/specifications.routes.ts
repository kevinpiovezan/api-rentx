import { Router, Request, Response } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);
specificationRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listSpecificationsController.handle
);

export { specificationRoutes };
