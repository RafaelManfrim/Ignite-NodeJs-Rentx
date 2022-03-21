import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";

let sendForgotPasswordMailService: SendForgotPasswordMailService;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProviderInMemory = new MailProviderInMemory();
    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  test("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "684034",
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "1234",
    });

    await sendForgotPasswordMailService.execute("john.doe@gmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  test("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailService.execute("john.doe@gmail.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  test("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "684034",
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "1234",
    });

    await sendForgotPasswordMailService.execute("john.doe@gmail.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
