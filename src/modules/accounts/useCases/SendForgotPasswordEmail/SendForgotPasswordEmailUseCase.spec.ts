import { DayjsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/provider/MailProvider/inmemory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordEmailUseCase } from './SendForgotPasswordEmailUseCase';

describe('Send Forgot Mail', () => {
  let sendForgotPasswordEmailUseCase: SendForgotPasswordEmailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordEmailUseCase = new SendForgotPasswordEmailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it('should be able to send a forgot password mail to user', async () => {
    await usersRepositoryInMemory.create({
      name: 'random name',
      email: 'random@email.com',
      password: 'randompassword',
      driver_license: 'ABC-1234',
    });
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await sendForgotPasswordEmailUseCase.execute('random@email.com');
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email if user does not exists', () => {
    expect(async () => {
      await sendForgotPasswordEmailUseCase.execute('wrong@email.com');
    }).rejects.toEqual(new AppError('User does not exists!'));
  });
  it('should be able to create a user`s token', async () => {
    const userToken = jest.spyOn(usersTokensRepositoryInMemory, 'create');
    await usersRepositoryInMemory.create({
      name: 'random2 name',
      email: 'random2@email.com',
      password: 'random2password',
      driver_license: 'ABC-1234',
    });
    await sendForgotPasswordEmailUseCase.execute('random2@email.com');
    expect(userToken).toHaveBeenCalled();
  });
});
