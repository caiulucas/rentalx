import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IListAvailableCarsDTO } from '@modules/cars/dtos/IListAvailableCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  constructor(private cars: Car[] = []) {}

  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id);
  }

  async findManyAvailable({
    name,
    brand,
    category_id,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    if (name)
      return this.cars.filter(car => car.available && car.name === name);

    if (brand)
      return this.cars.filter(car => car.available && car.brand === brand);

    if (category_id)
      return this.cars.filter(
        car => car.available && car.category_id === category_id,
      );

    return this.cars.filter(car => car.available);
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === licensePlate);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = { ...new Car(), ...data };
    this.cars.push(car);

    return car;
  }
}
