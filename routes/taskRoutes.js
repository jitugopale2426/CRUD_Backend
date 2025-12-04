import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createTaskController, deleteTaskController, getAllTaskController, updateTaskController } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post('/create',authMiddleware,createTaskController)
taskRouter.put('/update/:id',authMiddleware,updateTaskController)
taskRouter.delete('/delete/:id',authMiddleware,deleteTaskController)
taskRouter.get('/getAll',authMiddleware,getAllTaskController)

export default taskRouter;