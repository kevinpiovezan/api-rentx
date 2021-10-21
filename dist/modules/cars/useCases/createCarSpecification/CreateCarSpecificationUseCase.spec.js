"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/SpecificationsRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepository;
describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepository = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepository);
  });
  it('should not be able to create a specification to a non existent car', async () => {
    const car_id = '123';
    const specification_id = ['54321'];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specification_id
    })).rejects.toEqual(new _AppError.AppError('Car does not exists'));
  });
  it('should be able to create a specification to an existent car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro',
      description: 'Specification car',
      daily_rate: 100,
      license_plate: 'DEF-5678',
      fine_amount: 50,
      brand: 'carBrand',
      category_id: '0d47836c-a899-428f-8d82-6c2da524a0e9'
    });
    const specification = await specificationsRepository.create({
      name: 'specificationTest',
      description: 'Testing specification'
    });
    const specification_id = [specification.id];
    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id
    });
    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications.length).toBe(1);
  });
});