import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    try {
      const { id } = request.user
      const avatar_file = request.file.filename;

      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
      await updateUserAvatarUseCase.execute({ user_id: id, avatar_file});

      return response.status(HttpStatusCode.NO_CONTENT).send();

    } catch (error) {

      if(error.message === "User does not exists!") {
        throw new AppError("User does not exists!",  HttpStatusCode.NO_CONTENT);
      }

      throw new AppError({
        message: "Invalid token!"
      }, HttpStatusCode.UNAUTHORIZED);

    }
  }
}

export { UpdateUserAvatarController };
