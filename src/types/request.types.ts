import { Request, Response } from "express";
import { ITodo } from "./todo.types";

export interface LoginBody {
  username: string;
  password: string;
}

export type TodoCreateBody = Pick<ITodo, "title" | "description">;

export interface RequestWithBody<T> extends Request {
  body: T;
}
