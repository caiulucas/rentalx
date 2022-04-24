import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  findMany(): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<void>;
  createMany(data: ICreateCategoryDTO[]): Promise<void>;
}
