import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IListAvailableCarsDTO } from '../dtos/IListAvailableCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findManyAvailable(data: IListAvailableCarsDTO): Promise<Car[]>;
}
