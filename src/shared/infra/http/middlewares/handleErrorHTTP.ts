import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";

export async function handleErrorHTTP(
  err: Error, request: Request, response: Response, next: NextFunction) {

    if(err instanceof AppError) {
      
      if(typeof err.RET === "object") {
        return response.status(err.statusCode).json({...err.RET as Object});
      }

      return response.status(err.statusCode).json({
        message: err.RET
      })
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error${err.message ? ` - ${err.message}` : ""}`
    })
}
