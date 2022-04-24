import { ICreateCarImageDTO } from '../dtos/ICreateCarImageDTO';
import { CarImage } from '../infra/typeorm/entities/CarImage';

export interface ICarsImagesRepository {
  createMany(data: ICreateCarImageDTO[]): Promise<CarImage[]>;
}
