import express from "express";
import {isAuthenticated} from "../middleware/auth.js"
import { newTask,getMyTasks,updateTask, deleteTask } from "../controllers/taskController.js";

const router=express.Router()

router.post("/new",isAuthenticated,newTask)
router.get("/my",isAuthenticated,getMyTasks)
router.route("/:id")
        .put(isAuthenticated,updateTask)
        .delete(isAuthenticated,deleteTask)

export default router