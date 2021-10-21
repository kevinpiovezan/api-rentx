import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import {
  ISpecificationsRepository,
  ICreateSpecificationsDTO,
} from '../../infra/typeorm/repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists)
      throw new AppError('Specification already exists');
    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationsUseCase };
