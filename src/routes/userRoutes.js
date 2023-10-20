import express from "express"
import { addUser, getUsers } from "../controllers/userController.js"
import { checkPass, checkUsername } from "../middlewares/userMiddleware.js"
const userRouter = express.Router()

userRouter.get('/read', getUsers)
userRouter.post('/add', checkUsername, checkPass, addUser)

export default userRouter
