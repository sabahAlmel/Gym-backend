import express from "express"
import { addUser, deleteUser, getUsers } from "../controllers/userController.js"
import { checkPass, checkUserID, checkUsername } from "../middlewares/userMiddleware.js"
const userRouter = express.Router()

userRouter.get('/read', getUsers)
userRouter.post('/add', checkUsername, checkPass, addUser)
userRouter.delete('/delete',checkUserID, deleteUser)

export default userRouter
