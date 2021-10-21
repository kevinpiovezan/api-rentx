import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '../../infra/typeorm/IUsersTokensRepository';
import { IUserRepository } from '../../infra/typeorm/repositories/IUserRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );
    if (!userToken) {
      throw new AppError('Token invalid!');
    }
    const dateNow = this.dateProvider.dateNow();
    const isBefore = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      dateNow
    );
    if (isBefore) {
      throw new AppError('Token expired!');
    }
    const user = await this.usersRepository.findById(userToken.user_id);
    user.password = await hash(password, 8);
    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
export { ResetPasswordUserUseCase };
