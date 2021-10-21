import { inject, injectable } from 'tsyringe';

import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../infra/typeorm/repositories/ICarsRepository';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.list(name, brand, category_id);
    return cars;
  }
}

export { ListCarsUseCase };
