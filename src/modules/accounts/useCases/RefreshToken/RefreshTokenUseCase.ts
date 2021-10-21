import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { UserTokens } from '../../infra/typeorm/entities/UserTokens';
import { IUsersTokensRepository } from '../../infra/typeorm/IUsersTokensRepository';

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;
    const userToken = await this.usersTokensRepository.findByIdAndRefreshToken(
      user_id,
      token
    );
    if (!userToken) {
      throw new AppError('User token not found!');
    }
    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.dateProvider.addDays(
      auth.expires_in_refresh_token_days
    );

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });
    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}
export { RefreshTokenUseCase };
