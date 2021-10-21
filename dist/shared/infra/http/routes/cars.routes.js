"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreateCarController = require("../../../../modules/cars/useCases/CreateCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListCarsController = require("../../../../modules/cars/useCases/listCars/ListCarsController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listCarsController = new _ListCarsController.ListCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const uploadImages = (0, _multer.default)(_upload.default);
carsRoutes.post('/', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.post('/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.get('/', listCarsController.handle);
carsRoutes.post('/images/:id', _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, uploadImages.array('images'), uploadCarImageController.handle);