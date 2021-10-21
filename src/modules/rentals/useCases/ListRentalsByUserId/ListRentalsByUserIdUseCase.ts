import { inject, injectable } from 'tsyringe';

import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../infra/typeorm/repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserIdUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);
    return rentalsByUser;
  }
}
export { ListRentalsByUserIdUseCase };
