import { parse as csvParse } from "csv-parse";
import fs from "fs";

type IResolveUploadCSV = Promise<Record<string, string>[]>

const deleteFile = async (filename: string) => {

  try {
    await fs.promises.stat(filename);
  } catch (error) {
    return;
  }
  
  await fs.promises.unlink(filename);
}

const uploadCSV = async (file: Express.Multer.File): IResolveUploadCSV => {
  return new Promise(async (resolve, reject) => { 

    const rows: Record<string, string>[] = []
    const stream = fs.createReadStream(file.path);
    const parseFile = csvParse({ columns: true });
    
    return stream.pipe(parseFile)
      .on("data", async (row) => {rows.push(row)})
      .on("end", async () => await deleteFile(file.path).then(() => resolve(rows)))
      .on("error", (err) => reject(err))
  })
}

export {
  deleteFile,
  uploadCSV
};
