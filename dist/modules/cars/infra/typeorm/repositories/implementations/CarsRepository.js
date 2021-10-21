"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async findById(car_id) {
    const car = await this.repository.findOne(car_id);
    return car;
  }

  async create(data) {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }

  findByLicensePlate(license_plate) {
    const car = this.repository.findOne({
      license_plate
    });
    return car;
  }

  async list(name, brand, category_id) {
    const carsQuery = this.repository.createQueryBuilder('c').where('available = :available', {
      available: true
    });

    if (name) {
      carsQuery.andWhere('name = :name', {
        name
      });
    }

    if (brand) {
      carsQuery.andWhere('brand = :brand', {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async updateAvailable(id, available) {
    const car = await this.repository.findOne(id);
    car.available = available;
    await this.repository.save(car);
    return car;
  }

}

exports.CarsRepository = CarsRepository;