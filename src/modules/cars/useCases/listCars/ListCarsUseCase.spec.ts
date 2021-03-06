import { ICarsRepository } from '../../infra/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;
beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
});
describe('List Cars', () => {
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car',
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name_Car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car',
    });
    const cars = await listCarsUseCase.execute({
      name: 'Name_Car',
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name_Car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car',
    });
    const cars = await listCarsUseCase.execute({
      brand: 'Brand',
    });
    expect(cars).toEqual([car]);
  });
  it('should be able to list all available cars by category id', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name_Car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car',
    });
    const cars = await listCarsUseCase.execute({
      category_id: 'category',
    });
    expect(cars).toEqual([car]);
  });
});
