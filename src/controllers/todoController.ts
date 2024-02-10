import { Request, Response } from "express";
import { TodoDocument } from "../models/todo";
import { Error } from "mongoose";
import todoService from "../services/todoService";
import { RequestWithBody, TodoCreateBody } from "../types/request.types";

export const getAllTodos = async (req: Request, res: Response) => {
  await todoService
    .getAllTodos()
    .then((todos) => {
      res.json({ todos: todos });
    })
    .catch((err: Error) => {
      res.status(500).json({ message: err.message });
    });
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.getTodo(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (
  req: RequestWithBody<TodoCreateBody>,
  res: Response
) => {
  // Joi  or express-validator
  const { title, description } = req.body;
  try {
    const newTodo = await todoService.createTodo(title, description);
    res.status(201).json(newTodo);
  } catch (err) {
    const error = err as Error;

    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updatedTodo = await todoService.updateTodo(
      req.params.id,
      req.body as TodoDocument
    );
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (err) {
    const error = err as Error;

    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
};
