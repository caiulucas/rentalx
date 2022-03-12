import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const errorMessage = 'Email or password incorrect';

    if (!user) throw new AppError(errorMessage, 401);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError(errorMessage, 401);

    const token = sign({}, 'dbcbc0d24724b3f34b70189798940f9c', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user: { name: user.name, email: user.email }, token };
  }
}
