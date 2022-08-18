import { inject, injectable } from "tsyringe";

import { IUserResponseDTO, UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class UserProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { UserProfileService };
