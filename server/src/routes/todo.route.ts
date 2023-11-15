import * as TodoController from "../controllers/todo.controller"

import express from "express"

const router = express.Router()

router.post("/", TodoController.createTodo)
router.get("/", TodoController.getTodos)
router.patch("/:id/update", TodoController.updateTodoById)
router.delete("/:id/delete", TodoController.deleteTodoById)

export default router