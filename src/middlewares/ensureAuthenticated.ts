import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
      throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
      const {sub: user_id} = verify(token, "f580455f6507681630a262d058067290") as IPayload;
      next();

      const usersRepository = new UsersRepository();
      const user = await usersRepository.findById(user_id);

      if(!user) {
        throw new Error("User does not exists!")
      }
      
    } catch (error) {
      throw new Error("Invalid token!");
    }
}