import { inject, injectable } from "tsyringe";

import {
  IUsersRepository,
  ICreateUserDTO,
} from "../repositories/IUsersRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    username,
    driver_license,
  }: ICreateUserDTO) {
    await this.usersRepository.create({
      name,
      email,
      password,
      username,
      driver_license,
    });
  }
}

export { CreateUserService };
