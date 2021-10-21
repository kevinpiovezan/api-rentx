import { ICreateUserTokenDTO } from '../../../../dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../entities/UserTokens';
import { IUsersTokensRepository } from '../../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersToken: UserTokens[] = [];
  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, { user_id, expires_date, refresh_token });
    this.usersToken.push(userToken);
    return userToken;
  }
  async findByIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token
    );
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.usersToken.findIndex((ut) => ut.id === id);
    this.usersToken.splice(userTokenIndex, 1);
  }
  async findByRefreshToken(refresh_token: any): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (ut) => ut.refresh_token === refresh_token
    );
    return userToken;
  }
}
export { UsersTokensRepositoryInMemory };
