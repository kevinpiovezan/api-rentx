"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordEmailController = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordEmailUseCase = require("./SendForgotPasswordEmailUseCase");

class SendForgotPasswordEmailController {
  async handle(request, response) {
    const sendForgotPasswordEmailUseCase = _tsyringe.container.resolve(_SendForgotPasswordEmailUseCase.SendForgotPasswordEmailUseCase);

    const {
      email
    } = request.body;
    await sendForgotPasswordEmailUseCase.execute(email);
    return response.status(201).send();
  }

}

exports.SendForgotPasswordEmailController = SendForgotPasswordEmailController;