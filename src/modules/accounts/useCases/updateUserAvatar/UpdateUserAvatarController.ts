import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import HttpStatusCode from "../../../../errors/HttpStatusCode";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    try {
      const { id } = request.user
      const avatar_file = request.file.filename;

      const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
      await updateUserAvatarUseCase.execute({ user_id: id, avatar_file})

      return response.status(HttpStatusCode.NO_CONTENT).send();

    } catch (error) {
        throw new AppError(error.message);
    }
  }
}

export { UpdateUserAvatarController };
