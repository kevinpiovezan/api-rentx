"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUseCase = require("./ProfileUserUseCase");

class ProfileUserController {
  async handle(request, response) {
    const profileUserUseCase = _tsyringe.container.resolve(_ProfileUserUseCase.ProfileUserUseCase);

    const {
      id
    } = request.user;
    const profile = await profileUserUseCase.execute(id);
    return response.json(profile);
  }

}

exports.ProfileUserController = ProfileUserController;