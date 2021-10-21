import { inject, injectable } from 'tsyringe';

import { IUserResponseDTO } from '../../dtos/IUserResponseDTO';
import { IUserRepository } from '../../infra/typeorm/repositories/IUserRepository';
import { UserMap } from '../../mapper/UserMap';

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}
export { ProfileUserUseCase };
