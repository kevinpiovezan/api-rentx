import { inject, injectable } from 'tsyringe';

import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoryRepository } from '../../infra/typeorm/repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
export { ListCategoriesUseCase };
