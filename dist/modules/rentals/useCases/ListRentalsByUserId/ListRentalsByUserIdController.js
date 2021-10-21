"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserIdController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserIdUseCase = require("./ListRentalsByUserIdUseCase");

class ListRentalsByUserIdController {
  async handle(request, response) {
    const listRentalsByUserIdUseCase = _tsyringe.container.resolve(_ListRentalsByUserIdUseCase.ListRentalsByUserIdUseCase);

    const {
      id: user_id
    } = request.user;
    const rentals = await listRentalsByUserIdUseCase.execute(user_id);
    return response.json(rentals);
  }

}

exports.ListRentalsByUserIdController = ListRentalsByUserIdController;