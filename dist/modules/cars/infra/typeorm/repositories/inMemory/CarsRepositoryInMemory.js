"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create(data) {
    const car = new _Car.Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async list(category_id, name, brand) {
    const allCars = this.cars.filter(car => {
      if (car.available === true || name && car.name === name || brand && car.brand === brand || category_id && car.category_id === category_id) {
        return car;
      }

      return null;
    });
    return allCars;
  }

  async findById(car_id) {
    const car = await this.cars.find(car => car.id === car_id);
    return car;
  }

  async updateAvailable(id, available) {
    const car = this.cars.find(car => car.id === id);
    car.available = available;
    return car;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;