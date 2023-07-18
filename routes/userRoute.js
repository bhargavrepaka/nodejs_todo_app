import express from "express";
import {
    getAllUsers,
    getMyDetails,
    login,
    logout,
    register
} from "../controllers/userControllers.js"
import { isAuthenticated } from "../middleware/auth.js";
const router=express.Router()

router.get("/all",getAllUsers)
router.post("/new",register)
router.post("/login",login)
router.get("/logout",logout)
router.get("/me",isAuthenticated,getMyDetails)

export default router 