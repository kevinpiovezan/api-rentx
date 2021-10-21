import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../infra/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car',
    });
    expect(car).toHaveProperty('id');
  });
  it('should not be able to create with an existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Car1',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'car1',
    });
    await expect(
      createCarUseCase.execute({
        name: 'Car2',
        description: 'Description Car',
        brand: 'Brand',
        category_id: 'category',
        daily_rate: 100,
        fine_amount: 60,
        license_plate: 'car1',
      })
    ).rejects.toEqual(new AppError('Car already exists'));
  });
  it('should be able to create a car with available as true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'car1',
    });
    expect(car.available).toBe(true);
  });
});
