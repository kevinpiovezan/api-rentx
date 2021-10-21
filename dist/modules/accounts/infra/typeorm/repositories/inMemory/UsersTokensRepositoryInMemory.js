"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;

var _UserTokens = require("../../entities/UserTokens");

class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersToken = [];
  }

  async create({
    user_id,
    expires_date,
    refresh_token
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      user_id,
      expires_date,
      refresh_token
    });
    this.usersToken.push(userToken);
    return userToken;
  }

  async findByIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersToken.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);
    return userToken;
  }

  async deleteById(id) {
    const userTokenIndex = this.usersToken.findIndex(ut => ut.id === id);
    this.usersToken.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token) {
    const userToken = this.usersToken.find(ut => ut.refresh_token === refresh_token);
    return userToken;
  }

}

exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;