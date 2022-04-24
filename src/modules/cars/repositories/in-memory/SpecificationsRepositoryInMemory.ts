import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  constructor(private specifications: Specification[] = []) {}

  async create(data: ICreateSpecificationDTO): Promise<Specification> {
    const specification = { ...new Specification(), ...data };

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  async findManyByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(specification =>
      ids.includes(specification.id),
    );
  }
}
