import { AppError } from "@errors/AppError";
import HttpStatusCode from "@errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";


class ListUserController {

  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const listUserUseCase = container.resolve(ListUserUseCase);

      const users = await listUserUseCase.execute();

      return response.status(200).json(users);

    } catch (error) {

      if(error.message === "No existing users!") {
        throw new AppError(error.message, HttpStatusCode.NO_CONTENT);
      }

      throw new Error(error.message);
    }
  }
}

export { ListUserController };
