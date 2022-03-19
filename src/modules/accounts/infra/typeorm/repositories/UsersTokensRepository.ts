import { getRepository, Repository } from "typeorm";

import {
  ICreateUsersTokensDTO,
  IUsersTokensRepository,
} from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../model/UserTokens";

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO) {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByToken(token: string) {
    const usersTokens = await this.repository.findOne({
      refresh_token: token,
    });
    return usersTokens;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    });
    return usersTokens;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}
