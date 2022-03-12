import { getRepository, Repository } from 'typeorm';

import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

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

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}
