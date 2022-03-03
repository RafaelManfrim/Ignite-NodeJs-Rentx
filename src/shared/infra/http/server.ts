import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import startConnection from "../typeorm";
import { router } from "./routes";
import "../../container";

startConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${error.message}`,
  });
});

app.listen(3333);
