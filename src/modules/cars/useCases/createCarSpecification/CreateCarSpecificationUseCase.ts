import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../infra/typeorm/repositories/ICarsRepository';
import { ISpecificationsRepository } from '../../infra/typeorm/repositories/ISpecificationsRepository';

interface IRequest {
  car_id: string;
  specification_id: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const existingCar = await this.carsRepository.findById(car_id);

    if (!existingCar) {
      throw new AppError('Car does not exists');
    }
    const specification = await this.specificationsRepository.findByIds(
      specification_id
    );
    existingCar.specifications = specification;
    await this.carsRepository.create(existingCar);
    return existingCar;
  }
}

export { CreateCarSpecificationUseCase };
