import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "./CreateUserService";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserService = new AuthenticateUserService(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  test("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@test.com",
      driver_license: "12345",
      password: "12345",
    };

    await createUserService.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  test("Should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserService.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  test("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@password.test.com",
      driver_license: "12345",
      password: "12345",
    };

    await createUserService.execute(user);

    await expect(
      authenticateUserService.execute({
        email: user.email,
        password: "fake-password",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
