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

  test("Should be able to create a new category", async () => {
    const responseSession = await request(app).post("/session/").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseSession.body;

    const response = await request(app)
      .post("/categories/")
      .send({
        name: "Category SuperTest",
        description: "Category Description SuperTest",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(201);
  });

  test("Should not be able to create a new category if name already exists", async () => {
    const responseSession = await request(app).post("/session/").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseSession.body;

    const response = await request(app)
      .post("/categories/")
      .send({
        name: "Category SuperTest",
        description: "Category Description SuperTest",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(response.statusCode).toBe(400);
  });
});
