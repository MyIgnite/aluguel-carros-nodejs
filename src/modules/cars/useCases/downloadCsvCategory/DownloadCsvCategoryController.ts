import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { DownloadCsvCategoryUseCase } from "./DownloadCsvCategoryUseCase";

/** NOTE TSyringe
 * 
 * container.resolve() é usado para resolver (ou instanciar) a classe passada 
 * como parâmetro através do container.
 */

class DownloadCsvCategoryController {

  async handle(request: Request, response: Response): Promise<void> {
    try {
      const downloadCsvCategoryUseCase = container.resolve(DownloadCsvCategoryUseCase);
      const csv = await downloadCsvCategoryUseCase.execute();
      
      response.set({
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=model_import_category.csv"
      })
      
      response.send(csv);

    } catch (error) {
      throw new AppError(error.message);
    }
  }
}

export { DownloadCsvCategoryController };
