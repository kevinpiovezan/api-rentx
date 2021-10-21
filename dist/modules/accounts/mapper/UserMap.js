"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserMap = void 0;

var _classTransformer = require("class-transformer");

class UserMap {
  static toDTO({
    email,
    name,
    avatar,
    driver_license,
    id,
    avatar_url
  }) {
    const user = (0, _classTransformer.classToClass)({
      email,
      name,
      avatar,
      id,
      driver_license,
      avatar_url
    });
    return user;
  }

}

exports.UserMap = UserMap;