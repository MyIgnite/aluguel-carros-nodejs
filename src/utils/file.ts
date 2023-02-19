import fs from "fs";
import { AppError } from "../errors/AppError";
import HttpStatusCode from "../errors/HttpStatusCode";

export const deleteFile = async (filename: string) => {

  try {
    await fs.promises.stat(filename);
    
  } catch (error) {
    throw new AppError(error.message,HttpStatusCode.CONFLICT)
  }
  
  await fs.promises.unlink(filename);
}