import { rejects } from 'assert';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { DayjsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../../cars/infra/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: IDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe('Create Rental', () => {
  dayjs.extend(utc);
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car brand',
      category_id: '1234',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-1234',
      description: 'Car description',
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
  it('should not be able to create a new rental if the car already has one rental opened', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car brand',
      category_id: '1234',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-1234',
      description: 'Car description',
    });
    await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '4321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental if the user already has one opened', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car brand',
      category_id: '1234',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-1234',
      description: 'Car description',
    });
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError('User already have an open rental'));
  });
  it('should not be able to create a new rental if the expected return is lower than 24h', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: new Date(),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
