"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../config/auth"));

var _UsersTokensRepository = require("../../../../modules/accounts/infra/typeorm/repositories/implementations/UsersTokensRepository");

var _AppError = require("../../../errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_token);
    const usersTokensRepository = new _UsersTokensRepository.UsersTokensRepository();
    request.user = {
      id: user_id
    };
    next();
  } catch (e) {
    throw new _AppError.AppError('Invalid Token!', 401);
  }
}