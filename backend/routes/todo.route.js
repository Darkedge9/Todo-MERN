import express from "express";
import { authenticate } from "../middleware/authorise.js";
import { createTodo, deleteTodo, getTodos, updateTodos } from "../controller/todo.controller.js"; 

const router = express.Router();

router.post("/create",authenticate,  createTodo);
router.get("/fetch",authenticate, getTodos)
router.put("/update/:id",authenticate, updateTodos )
router.delete("/delete/:id",authenticate, deleteTodo)

export default router;
