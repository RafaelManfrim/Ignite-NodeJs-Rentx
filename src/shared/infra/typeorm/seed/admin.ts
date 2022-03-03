import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import startConnection from "..";

async function create() {
  const connection = await startConnection();

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license) values ('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'true', 'now()', '12345-661')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created"));
