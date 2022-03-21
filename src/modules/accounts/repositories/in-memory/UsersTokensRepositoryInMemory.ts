import { UserTokens } from "../../infra/typeorm/model/UserTokens";
import {
  ICreateUsersTokensDTO,
  IUsersTokensRepository,
} from "../IUsersTokensRepository";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create(data: ICreateUsersTokensDTO) {
    const userToken = new UserTokens();

    Object.assign(userToken, { ...data });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async deleteById(id: string) {
    const userToken = this.usersTokens.find((data) => data.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByToken(token: string) {
    return this.usersTokens.find((data) => data.refresh_token === token);
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string) {
    return this.usersTokens.find(
      (data) => data.refresh_token === refresh_token && data.user_id === user_id
    );
  }
}
