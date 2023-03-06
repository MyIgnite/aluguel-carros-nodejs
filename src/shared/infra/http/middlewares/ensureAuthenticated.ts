import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import HttpStatusCode from "@shared/errors/HttpStatusCode";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
      throw new AppError("Token missing", HttpStatusCode.UNAUTHORIZED);
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
      const usersRepository = new UsersRepositoryInMemory();
      const user = await usersRepository.findById(user_id);

      if(!user) {
        throw new AppError("User does not exists!", HttpStatusCode.UNAUTHORIZED);
      }

      request.user = {
        id: user_id
      }
      
      next();
      
    } catch (error) {
      throw new AppError("Invalid token!", HttpStatusCode.UNAUTHORIZED);
    }
}