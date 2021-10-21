import { container } from 'tsyringe';

import './provider/DateProvider';
import './provider/MailProvider';
import './provider/StorageProvider';
import { IUsersTokensRepository } from '../../modules/accounts/infra/typeorm/IUsersTokensRepository';
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/implementations/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/implementations/UsersTokensRepository';
import { IUserRepository } from '../../modules/accounts/infra/typeorm/repositories/IUserRepository';
import { ICarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/ICarsImagesRepository';
import { ICarsRepository } from '../../modules/cars/infra/typeorm/repositories/ICarsRepository';
import { ICategoryRepository } from '../../modules/cars/infra/typeorm/repositories/ICategoriesRepository';
import { CarImagesRepository } from '../../modules/cars/infra/typeorm/repositories/implementations/CarImagesRepository';
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/implementations/CarsRepository';
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/ISpecificationsRepository';
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/implementations/RentalsRepository';
import { IRentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/IRentalsRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);
container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
