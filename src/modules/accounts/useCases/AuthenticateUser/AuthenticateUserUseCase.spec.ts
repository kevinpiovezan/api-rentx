import { DayjsDateProvider } from '../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../infra/typeorm/repositories/inMemory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUsersUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
  });
  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      name: 'User Test',
      email: 'user@test.com',
      driver_license: '000123',
      password: '123456',
    };
    await createUsersUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(result).toHaveProperty('token');
  });
  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });
  it('should not be able to authenticate a user with wrong password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '9999',
      email: 'user@user.com',
      name: 'User Test Error',
      password: '1234',
    };
    await createUsersUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: 'user@user.com',
        password: 'incorrect password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect', 401));
  });
});
