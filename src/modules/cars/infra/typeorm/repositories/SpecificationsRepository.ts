import { getRepository } from 'typeorm';

import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  constructor(private repository = getRepository(Specification)) {}
  async findManyByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(data);

    return this.repository.save(specification);
  }
}
