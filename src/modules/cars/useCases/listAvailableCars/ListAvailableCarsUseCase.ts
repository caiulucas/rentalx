import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { IListAvailableCarsDTO } from '../../dtos/IListAvailableCarsDTO';

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository,
  ) {}

  async execute(data: IListAvailableCarsDTO): Promise<Car[]> {
    return this.carsRepository.findManyAvailable(data);
  }
}
