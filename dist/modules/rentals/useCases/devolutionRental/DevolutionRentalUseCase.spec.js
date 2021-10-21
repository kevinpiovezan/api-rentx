"use strict";

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

var _CarsRepositoryInMemory = require("../../../cars/infra/typeorm/repositories/inMemory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

let rentalsRepositoryInMemory;
let carsRepositoryInMemory;
let devolutionRentalUseCase;
let dateProvider;
describe('Devolution Rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    devolutionRentalUseCase = new _DevolutionRentalUseCase.DevolutionRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dateProvider);
  });
  it('should be able to return a vehicle and finish a rental', () => {//
  });
});