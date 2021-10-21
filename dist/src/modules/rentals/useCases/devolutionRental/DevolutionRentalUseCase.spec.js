"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DayjsDateProvider_1 = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");
var CarsRepositoryInMemory_1 = require("../../../cars/infra/typeorm/repositories/inMemory/CarsRepositoryInMemory");
var RentalsRepositoryInMemory_1 = require("../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory");
var DevolutionRentalUseCase_1 = require("./DevolutionRentalUseCase");
var rentalsRepositoryInMemory;
var carsRepositoryInMemory;
var devolutionRentalUseCase;
var dateProvider;
describe('Devolution Rental', function () {
    beforeEach(function () {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        devolutionRentalUseCase = new DevolutionRentalUseCase_1.DevolutionRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dateProvider);
    });
    it('should be able to return a vehicle and finish a rental', function () {
        //
    });
});
