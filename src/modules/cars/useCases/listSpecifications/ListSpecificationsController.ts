import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationController {

  constructor(private listSpecificationUseCase: ListSpecificationsUseCase){}

  handle(request: Request, response: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();
    return response.json(specifications);
  }
}

export { ListSpecificationController };
