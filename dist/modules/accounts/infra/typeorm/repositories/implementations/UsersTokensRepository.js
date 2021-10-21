"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepository = void 0;

var _typeorm = require("typeorm");

var _UserTokens = require("../../entities/UserTokens");

class UsersTokensRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_UserTokens.UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token
    });
    await this.repository.save(userToken);
    return userToken;
  }

  async findByIdAndRefreshToken(user_id, refresh_token) {
    const refreshToken = await this.repository.findOne({
      user_id,
      refresh_token
    });
    return refreshToken;
  }

  async deleteById(id) {
    await this.repository.delete(id);
  }

  findByRefreshToken(refresh_token) {
    return this.repository.findOne({
      refresh_token
    });
  }

}

exports.UsersTokensRepository = UsersTokensRepository;