import { UserTokens } from "../infra/typeorm/model/UserTokens";

export interface ICreateUsersTokensDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

export interface IUsersTokensRepository {
  create: (data: ICreateUsersTokensDTO) => Promise<UserTokens>;
  findByToken: (token: string) => Promise<UserTokens>;
  findByUserIdAndRefreshToken: (
    user_id: string,
    refresh_token: string
  ) => Promise<UserTokens>;
  deleteById: (id: string) => Promise<void>;
}
