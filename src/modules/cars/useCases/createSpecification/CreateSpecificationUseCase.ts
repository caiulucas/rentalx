import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(data.name);

    if (specificationAlreadyExists)
      throw new AppError('Specification already exists!', 400);

    await this.specificationsRepository.create(data);
  }
}
