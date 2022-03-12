import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename: avatarFile } = request.file;

    const updateUserUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserUseCase.execute({ userId: id, avatarFile });

    return response.status(204).send();
  }
}
