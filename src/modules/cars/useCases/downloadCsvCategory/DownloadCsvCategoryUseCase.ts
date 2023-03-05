import { ICsvRepository } from "@modules/cars/repositories/ICsvRepository";
import fs from "fs";
import { inject, injectable } from "tsyringe";

/** NOTE TSyringe
 * @injectable() é um decorador que é aplicado a uma classe para 
 * indicar que ela pode ser "injetada". 
 * 
 * A string é um token utilizado para identicar dentro do
 * container a classe que deve ser instanciada. 
 * "src/shared/container/index.ts"
 */

@injectable()
class DownloadCsvCategoryUseCase {

  constructor(
    @inject("CsvRepository")
    private downloadCsvCategoryUseCase: ICsvRepository
  ) {}

  async execute(): Promise<Buffer> {
    try {
      const filePath = await this.downloadCsvCategoryUseCase.create();
      const data = fs.readFileSync(filePath);
      return data;
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export { DownloadCsvCategoryUseCase };
