"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../../cars/infra/typeorm/repositories/inMemory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dateProvider;
let carsRepositoryInMemory;
describe('Create Rental', () => {
  _dayjs.default.extend(_utc.default);

  const dayAdd24Hours = (0, _dayjs.default)().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dateProvider, carsRepositoryInMemory);
  });
  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car brand',
      category_id: '1234',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-1234',
      description: 'Car description'
    });
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
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
      description: 'Car description'
    });
    await createRentalUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: '4321',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('Car is unavailable'));
  });
  it('should not be able to create a new rental if the user already has one opened', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      brand: 'Car brand',
      category_id: '1234',
      daily_rate: 100,
      fine_amount: 40,
      license_plate: 'ABC-1234',
      description: 'Car description'
    });
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError('User already have an open rental'));
  });
  it('should not be able to create a new rental if the expected return is lower than 24h', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date()
    })).rejects.toEqual(new _AppError.AppError('Invalid return time!'));
  });
});