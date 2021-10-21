"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepositoryInMemory = void 0;

var _Rental = require("../../entities/Rental");

class RentalsRepositoryInMemory {
  constructor() {
    this.rentals = [];
  }

  async findByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async create({
    car_id,
    user_id,
    expected_return_date
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });
    await this.rentals.push(rental);
    return rental;
  }

  async findById(id) {
    const rental = await this.rentals.find(rental => rental.id === id);
    return rental;
  }

  async findByUser(user_id) {
    return this.rentals.filter(rental => rental.user_id === user_id);
  }

}

exports.RentalsRepositoryInMemory = RentalsRepositoryInMemory;