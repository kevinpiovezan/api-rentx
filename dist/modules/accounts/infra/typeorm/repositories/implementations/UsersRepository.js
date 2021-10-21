"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("../../entities/User");

class UserRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create(data) {
    const {
      name,
      driver_license,
      email,
      password,
      id,
      avatar
    } = data;
    const user = this.repository.create({
      name,
      driver_license,
      email,
      password,
      id,
      avatar
    });
    await this.repository.save(user);
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async findById(id) {
    const user = await this.repository.findOne(id);
    return user;
  }

}

exports.UserRepository = UserRepository;