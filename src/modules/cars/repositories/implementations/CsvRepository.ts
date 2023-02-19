import { ICsvRepository } from "../ICsvRepository";

class CsvRepository implements ICsvRepository {
  async create(): Promise<string> {
    return "./src/downloads/model_import_category.csv";
  }
}

export { CsvRepository };
