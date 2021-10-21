import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserTokens } from './entities/UserTokens';

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token): Promise<UserTokens>;
}

export { IUsersTokensRepository };
