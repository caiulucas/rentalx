import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
