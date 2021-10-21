"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("../../../../modules/accounts/infra/typeorm/repositories/implementations/UsersRepository");

var _AppError = require("../../../errors/AppError");

async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRepository = new _UsersRepository.UserRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new _AppError.AppError('User is not a administrator');
  }

  return next();
}