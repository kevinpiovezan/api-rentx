"use strict";

var _tsyringe = require("tsyringe");

require("./provider/DateProvider");

require("./provider/MailProvider");

require("./provider/StorageProvider");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/implementations/UsersRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/implementations/UsersTokensRepository");

var _CarImagesRepository = require("../../modules/cars/infra/typeorm/repositories/implementations/CarImagesRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/implementations/CarsRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository");

var _SpecificationsRepository = require("../../modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/implementations/RentalsRepository");

_tsyringe.container.registerSingleton('CategoriesRepository', _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton('SpecificationsRepository', _SpecificationsRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.UserRepository);

_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton('CarsImagesRepository', _CarImagesRepository.CarImagesRepository);

_tsyringe.container.registerSingleton('RentalsRepository', _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton('UsersTokensRepository', _UsersTokensRepository.UsersTokensRepository);