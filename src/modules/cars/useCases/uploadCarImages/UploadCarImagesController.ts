import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFile {
  filename: string;
}

export class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const images = request.files as IFile[];

    const images_names = images.map(file => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const carImages = await uploadCarImageUseCase.execute({
      car_id,
      images_names,
    });

    return response.status(201).json(carImages);
  }
}
