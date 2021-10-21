"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../../entities/CarImage");

class CarImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImages);
  }

  async create(car_id, image_name) {
    const carImage = await this.repository.create({
      car_id,
      image_name
    });
    const car = await this.repository.save(carImage);
    return car;
  }

}

exports.CarImagesRepository = CarImagesRepository;