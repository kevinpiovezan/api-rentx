import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICarsRepository } from '../../../cars/infra/typeorm/repositories/ICarsRepository';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../infra/typeorm/repositories/IRentalsRepository';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findByCar(car_id);
    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    if (rentalOpenToUser) {
      throw new AppError('User already have an open rental');
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date
    );

    if (compare < 24) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}

export { CreateRentalUseCase };
