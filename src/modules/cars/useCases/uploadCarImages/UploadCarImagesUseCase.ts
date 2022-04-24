import { inject, injectable } from 'tsyringe';

import { CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  async execute({ car_id, images_names }: IRequest): Promise<CarImage[]> {
    const carImages = images_names.map(image_name => ({
      car_id,
      image_name,
    }));

    return this.carsImagesRepository.createMany(carImages);
  }
}
