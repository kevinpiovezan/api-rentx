"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async findByCar(car_id) {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return rental;
  }

  async findByUser(user_id) {
    const rental = await this.repository.find({
      where: {
        user_id
      },
      relations: ['car']
    });
    return rental;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total
  }) {
    const rental = await this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

}

exports.RentalsRepository = RentalsRepository;