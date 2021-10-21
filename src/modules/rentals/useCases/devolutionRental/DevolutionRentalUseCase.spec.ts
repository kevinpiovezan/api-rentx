import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { DayjsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '../../../cars/infra/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let devolutionRentalUseCase: DevolutionRentalUseCase;
let dateProvider: IDateProvider;
describe('Devolution Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dateProvider
    );
  });
  it('should be able to return a vehicle and finish a rental', () => {
    //
  });
});
