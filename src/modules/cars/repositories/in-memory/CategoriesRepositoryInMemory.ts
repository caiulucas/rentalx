import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { ...data, created_at: new Date() });

    this.categories.push(category);
  }
  async createMany(data: ICreateCategoryDTO[]): Promise<void> {
    const createdCategories: Category[] = [];

    data.forEach(category => {
      const newCategory = new Category();

      Object.assign(category, { ...category, created_at: new Date() });

      createdCategories.push(newCategory);
    });

    this.categories.push(...createdCategories);
  }
}
