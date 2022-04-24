import { getRepository } from 'typeorm';

import { ICreateCarImageDTO } from '@modules/cars/dtos/ICreateCarImageDTO';

import { ICarsImagesRepository } from '../../../repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements ICarsImagesRepository {
  constructor(private repository = getRepository(CarImage)) {}

  async createMany(data: ICreateCarImageDTO[]): Promise<CarImage[]> {
    const carsImages = this.repository.create(data);

    return this.repository.save(carsImages);
  }
}
