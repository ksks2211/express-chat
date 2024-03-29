import { Router } from "express";
import {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

const router = Router();

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get todo list
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getAllTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
