import express from "express"
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/userController.js"
import { checkPass, checkUserID, checkUsername, updatePass } from "../middlewares/userMiddleware.js"
const userRouter = express.Router()

userRouter.get('/read', getUsers)
userRouter.post('/add', checkUsername, checkPass, addUser)
userRouter.delete('/delete',checkUserID, deleteUser)
userRouter.patch('/update',checkUserID, updatePass, updateUser)

export default userRouter
