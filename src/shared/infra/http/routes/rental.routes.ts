import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserIdController } from '../../../../modules/rentals/useCases/ListRentalsByUserId/ListRentalsByUserIdController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserIdController = new ListRentalsByUserIdController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post(
  '/devolutions/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get(
  '/users',
  ensureAuthenticated,
  listRentalsByUserIdController.handle
);
export { rentalRoutes };
