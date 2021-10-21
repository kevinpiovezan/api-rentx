"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserIdController = require("../../../../modules/rentals/useCases/ListRentalsByUserId/ListRentalsByUserIdController");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserIdController = new _ListRentalsByUserIdController.ListRentalsByUserIdController();
rentalRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolutions/:id', _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/users', _ensureAuthenticated.ensureAuthenticated, listRentalsByUserIdController.handle);