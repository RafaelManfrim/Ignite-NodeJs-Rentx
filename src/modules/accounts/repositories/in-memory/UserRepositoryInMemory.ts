import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

export class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password, driver_license }: ICreateUserDTO) {
    const user = new User();

    Object.assign(user, { name, email, password, driver_license });

    this.users.push(user);
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
