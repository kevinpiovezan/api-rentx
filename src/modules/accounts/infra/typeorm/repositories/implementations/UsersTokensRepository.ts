import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '../../../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../entities/UserTokens';
import { IUsersTokensRepository } from '../../IUsersTokensRepository';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;
  constructor() {
    this.repository = getRepository(UserTokens);
  }
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });
    await this.repository.save(userToken);
    return userToken;
  }
  async findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const refreshToken = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return refreshToken;
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  findByRefreshToken(refresh_token: any): Promise<UserTokens> {
    return this.repository.findOne({ refresh_token });
  }
}
export { UsersTokensRepository };
