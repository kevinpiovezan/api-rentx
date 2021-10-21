import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../infra/typeorm/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/SpecificationsRepositoryInMemory';
import { ISpecificationsRepository } from '../../infra/typeorm/repositories/ISpecificationsRepository';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsRepository: ISpecificationsRepository;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepository
    );
  });
  it('should not be able to create a specification to a non existent car', async () => {
    const car_id = '123';
    const specification_id = ['54321'];
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specification_id })
    ).rejects.toEqual(new AppError('Car does not exists'));
  });
  it('should be able to create a specification to an existent car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro',
      description: 'Specification car',
      daily_rate: 100,
      license_plate: 'DEF-5678',
      fine_amount: 50,
      brand: 'carBrand',
      category_id: '0d47836c-a899-428f-8d82-6c2da524a0e9',
    });
    const specification = await specificationsRepository.create({
      name: 'specificationTest',
      description: 'Testing specification',
    });
    const specification_id = [specification.id];
    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });
    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications.length).toBe(1);
  });
});
