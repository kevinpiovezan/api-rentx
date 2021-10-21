"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CategoriesRepositoryInMemory = require("../../infra/typeorm/repositories/inMemory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCase = require("./CreateCategoryUseCase");

let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description test'
    };
    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty('id');
  });
  it('should not be able to create a new category if name already exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description test'
    };
    await createCategoryUseCase.execute(category);
    await expect(createCategoryUseCase.execute(category)).rejects.toEqual(new _AppError.AppError('Category already exists'));
  });
});