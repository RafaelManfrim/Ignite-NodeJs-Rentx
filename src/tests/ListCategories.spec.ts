import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../shared/infra/http/app";
import startConnection from "../shared/infra/typeorm";

let connection: Connection;

describe("Create Category Intagration Test", () => {
  beforeAll(async () => {
    connection = await startConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', '12345-661')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  test("Should be able to list all categories", async () => {
    const responseSession = await request(app).post("/session/").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseSession.body;

    console.log(refresh_token);

    await request(app)
      .post("/categories/")
      .send({
        name: "Category SuperTest",
        description: "Category Description SuperTest",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    const response = await request(app)
      .get("/categories/")
      .set({ Authorization: `Bearer ${refresh_token}` });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category SuperTest");
  });
});
