"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var createCategoryController_1 = require("../../../../modules/cars/useCases/createCategory/createCategoryController");
var ImportCategoryController_1 = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");
var ListCategoriesController_1 = require("../../../../modules/cars/useCases/listCategories/ListCategoriesController");
var ensureAdmin_1 = require("../middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var upload = (0, multer_1.default)({
    dest: './tmp',
});
var categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
var createCategoryController = new createCategoryController_1.CreateCategoryController();
var importCategoryController = new ImportCategoryController_1.ImportCategoryController();
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
categoriesRoutes.get('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, listCategoriesController.handle);
categoriesRoutes.post('/', ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
