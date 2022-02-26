import { User } from "../model/User";

interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail: (email: string) => Promise<User>;
  findById: (id: string) => Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
