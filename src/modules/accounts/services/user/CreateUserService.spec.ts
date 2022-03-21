import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserService } from "./CreateUserService";

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserService: CreateUserService;

describe("Create user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  test("Should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      name: "User test",
      email: "user@test.com",
      driver_license: "12345",
      password: "12345",
    };

    await createUserService.execute(user);

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);

    expect(userCreated).toHaveProperty("id");
  });

  test("Shouldn't able to create an user with same email", async () => {
    await createUserService.execute({
      name: "User test",
      email: "user@test.com",
      driver_license: "12345",
      password: "12345",
    });

    await expect(
      createUserService.execute({
        name: "User test 2",
        email: "user@test.com",
        driver_license: "12345",
        password: "12345",
      })
    ).rejects.toEqual(new AppError("User already exists"));
  });
});
