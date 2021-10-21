"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsController = void 0;

var _tsyringe = require("tsyringe");

var _ListCarsUseCase = require("./ListCarsUseCase");

class ListCarsController {
  async handle(request, response) {
    const {
      name,
      brand,
      category_id
    } = request.query;

    const listCarsUseCase = _tsyringe.container.resolve(_ListCarsUseCase.ListCarsUseCase);

    const cars = await listCarsUseCase.execute({
      name: name,
      brand: brand,
      category_id: category_id
    });
    return response.json(cars);
  }

}

exports.ListCarsController = ListCarsController;