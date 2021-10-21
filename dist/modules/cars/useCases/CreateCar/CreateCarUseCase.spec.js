"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/CarsRepositoryInMemory");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'plate car'
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
      license_plate: 'car1'
    });
    await expect(createCarUseCase.execute({
      name: 'Car2',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'car1'
    })).rejects.toEqual(new _AppError.AppError('Car already exists'));
  });
  it('should be able to create a car with available as true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car available',
      description: 'Description Car',
      brand: 'Brand',
      category_id: 'category',
      daily_rate: 100,
      fine_amount: 60,
      license_plate: 'car1'
    });
    expect(car.available).toBe(true);
  });
});