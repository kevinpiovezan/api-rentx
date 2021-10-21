import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { Rental } from '../../entities/Rental';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async findByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return rental;
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
    return rental;
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);
    return rental;
  }
}

export { RentalsRepository };
