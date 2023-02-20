import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

async function releaseRoute(request: Request, path: string, method: string) {
  if(request.path === path && request.method === method) {
    return true
  }
}

async function captureToken(request: Request) {
  const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");
    return token
}

export async function ensureAuthenticated(
  request: Request, response: Response, next: NextFunction) {
       
    try {

      if(await releaseRoute(request, "/users", "POST")) {
        return next()
      }
  
      const token = await captureToken(request);

      // REVIEW Salvar token na env 
      const {sub: user_id} = verify(token, "f580455f6507681630a262d058067290") as IPayload;
      
      // REVIEW Transformar em injeção de dependência
      const usersRepository = new UsersRepository();
      const user = await usersRepository.findById(user_id);

      if(!user) {
        throw new AppError("User does not exists!", 401);
      }

      request.user = {
        id: user_id
      }
      
      next();
      
    } catch (error) {
      throw new AppError("Invalid token!", 401);
    }
}