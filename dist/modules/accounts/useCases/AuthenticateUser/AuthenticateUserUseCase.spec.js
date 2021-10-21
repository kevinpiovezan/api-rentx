"use strict";

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory");

var _CreateUserUseCase = require("../CreateUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let usersRepositoryInMemory;
let createUsersUseCase;
let dateProvider;
let usersTokensRepositoryInMemory;
describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    createUsersUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
  });
  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'User Test',
      email: 'user@test.com',
      driver_license: '000123',
      password: '123456'
    };
    await createUsersUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'false@email.com',
      password: '1234'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect', 401));
  });
  it('should not be able to authenticate a user with wrong password', async () => {
    const user = {
      driver_license: '9999',
      email: 'user@user.com',
      name: 'User Test Error',
      password: '1234'
    };
    await createUsersUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: 'user@user.com',
      password: 'incorrect password'
    })).rejects.toEqual(new _AppError.AppError('Email or password incorrect', 401));
  });
});