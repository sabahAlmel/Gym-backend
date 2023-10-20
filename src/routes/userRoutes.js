import express from "express"
import { getUsers } from "../controllers/userController.js"
const userRouter = express.Router()

export default userRouter.get('/read', getUsers)


