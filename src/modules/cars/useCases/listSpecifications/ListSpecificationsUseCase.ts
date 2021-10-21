import { inject, injectable } from 'tsyringe';

import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '../../infra/typeorm/repositories/ISpecificationsRepository';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute(): Promise<Specification[]> {
    const specs = await this.specificationsRepository.list();
    return specs;
  }
}

export { ListSpecificationsUseCase };
