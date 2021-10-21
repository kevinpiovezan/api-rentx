"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesInMemory = void 0;

var _CarImage = require("../../entities/CarImage");

class CarsImagesInMemory {
  constructor() {
    this.carImages = [];
  }

  async create(car_id, image_name) {
    const carImage = new _CarImage.CarImages();
    Object.assign(carImage, {
      car_id,
      image_name
    });
    this.carImages.push(carImage);
    return carImage;
  }

}

exports.CarsImagesInMemory = CarsImagesInMemory;