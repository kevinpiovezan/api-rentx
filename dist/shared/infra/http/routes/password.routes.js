"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/ResetPasswordUser/ResetPasswordUserController");

var _SendForgotPasswordEmailController = require("../../../../modules/accounts/useCases/SendForgotPasswordEmail/SendForgotPasswordEmailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordEmailController = new _SendForgotPasswordEmailController.SendForgotPasswordEmailController();
const resetPasswordUserController = new _ResetPasswordUserController.ResetPasswordUserController();
passwordRoutes.post('/forgot', sendForgotPasswordEmailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);