import { getRepository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListAvailableCarsDTO } from '@modules/cars/dtos/IListAvailableCarsDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  constructor(private repository = getRepository(Car)) {}
  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }

  async findManyAvailable({
    name,
    brand,
    category_id,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    if (name) return this.repository.find({ where: { available: true, name } });

    if (brand)
      return this.repository.find({ where: { available: true, brand } });

    if (category_id)
      return this.repository.find({ where: { available: true, category_id } });

    return this.repository.find({ where: { available: true } });
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);

    this.repository.save(car);

    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { license_plate: licensePlate } });
  }
}
