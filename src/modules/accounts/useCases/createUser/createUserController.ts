import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import HttpStatusCode from "../../../../errors/HttpStatusCode";
import { CreateUserUseCase } from "./createUserUsecase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const {
        name,
        email,
        password,
        driver_license
      } = request.body;
  
      const createUserUseCase = container.resolve(CreateUserUseCase);
  
      await createUserUseCase.execute({
        name,
        email,
        password,
        driver_license
      });
  
      return response.status(201).send("Created");
      
    } catch (error) {
        if(error.message === "User Already exists!") {
          throw new AppError(error.message, HttpStatusCode.CONFLICT);
        }

        throw new Error(error.message);
    }
  }
}

export { CreateUserController };
