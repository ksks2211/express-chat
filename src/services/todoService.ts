import mongoose from "mongoose";
import Todo, { TodoDocument } from "../models/todo";

const getAllTodos = async (): Promise<TodoDocument[]> => {
  return await Todo.find();
};

const getTodo = async (id: string): Promise<TodoDocument | null> => {
  return await Todo.findById(id);
};

const createTodo = async (
  title: string,
  description: string
): Promise<TodoDocument> => {
  const todo = new Todo({ title, description });
  return await todo.save();
};

const updateTodo = async (
  id: string,
  data: TodoDocument
): Promise<TodoDocument | null> => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

const deleteTodo = async (id: string) => {
  return await Todo.findByIdAndDelete(id);
};

const toggleTodoCompleted = async (id: string): Promise<boolean> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Check if the Todo exists
    const exists = await Todo.exists({ _id: id }).session(session);
    if (!exists) {
      throw new Error("Todo not found");
    }

    // Toggle the isCompleted field
    // await Todo.updateOne({ _id: id }, [{ $set: { isCompleted: { $not: "$isCompleted" } } }], { session: session });
    const result = await Todo.toggleCompletedById(id);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
