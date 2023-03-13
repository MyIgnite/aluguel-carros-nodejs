import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response) {
    try {

      const {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      } = request.body;

      const createCarUseCase = container.resolve(CreateCarUseCase);

      const car = await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
      })

      return response.status(HttpStatusCode.CREATED).json(car);
      
    } catch (error) {

      if(error.message === "Car already exists!") {
        throw new AppError(error.message, HttpStatusCode.CONFLICT);
      }

      throw new Error(error.message);
    }
  }
}

export { CreateCarController };
