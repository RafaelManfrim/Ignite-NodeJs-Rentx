import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { sub } = verify(
      token,
      "6ba6b91ac2cf1e071986489cfcbf2292"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(sub);

    if (!user) {
      throw new Error("User does not exists!");
    }

    next();
  } catch {
    throw new Error("Invalid token!");
  }
}
