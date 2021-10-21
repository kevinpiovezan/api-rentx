"use strict";

var _DayjsDateProvider = require("../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/provider/MailProvider/inmemory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory");

var _SendForgotPasswordEmailUseCase = require("./SendForgotPasswordEmailUseCase");

describe('Send Forgot Mail', () => {
  let sendForgotPasswordEmailUseCase;
  let usersRepositoryInMemory;
  let usersTokensRepositoryInMemory;
  let dateProvider;
  let mailProvider;
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordEmailUseCase = new _SendForgotPasswordEmailUseCase.SendForgotPasswordEmailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it('should be able to send a forgot password mail to user', async () => {
    await usersRepositoryInMemory.create({
      name: 'random name',
      email: 'random@email.com',
      password: 'randompassword',
      driver_license: 'ABC-1234'
    });
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await sendForgotPasswordEmailUseCase.execute('random@email.com');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email if user does not exists', () => {
    expect(async () => {
      await sendForgotPasswordEmailUseCase.execute('wrong@email.com');
    }).rejects.toEqual(new _AppError.AppError('User does not exists!'));
  });
  it('should be able to create a user`s token', async () => {
    const userToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      name: 'random2 name',
      email: 'random2@email.com',
      password: 'random2password',
      driver_license: 'ABC-1234'
    });
    await sendForgotPasswordEmailUseCase.execute('random2@email.com');
    expect(userToken).toHaveBeenCalled();
  });
});