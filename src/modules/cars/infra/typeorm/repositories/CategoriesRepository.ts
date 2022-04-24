import { getRepository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  constructor(private repository = getRepository(Category)) {}

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create(data);
    await this.repository.save(category);
  }

  async createMany(data: ICreateCategoryDTO[]): Promise<void> {
    const categories: Category[] = [];

    data.forEach(({ name, description }) => {
      const category = this.repository.create({ name, description });
      categories.push(category);
    });

    await this.repository.save(categories);
  }

  async findMany(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}
