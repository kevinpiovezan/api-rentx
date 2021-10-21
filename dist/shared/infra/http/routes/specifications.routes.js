"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;

var _express = require("express");

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ListSpecificationsController = require("../../../../modules/cars/useCases/listSpecifications/ListSpecificationsController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationsController = new _ListSpecificationsController.ListSpecificationsController();
specificationRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);
specificationRoutes.get('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, listSpecificationsController.handle);