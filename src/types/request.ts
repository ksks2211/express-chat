import { Request, Response } from "express";
import { Todo } from "./todo.types";

interface LoginBody {
  username: string;
  password: string;
}

export interface CustomRequest extends Request {
  body: LoginBody;
}

export interface TodoCreateRequest extends Request {
  body: Pick<Todo, "title" | "description">;
}
