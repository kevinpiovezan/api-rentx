"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("../../../../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("../../../../modules/accounts/useCases/RefreshToken/RefreshTokenController");

const authenticateUserController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
authenticateRoutes.post('/sessions', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);