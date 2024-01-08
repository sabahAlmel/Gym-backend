import express from "express";
import {
  getAllUsers,
  addNewUser,
  updateUser,
  deleteUser,
  getOneUser,
} from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";
import { authenticate, checkRoles } from "../middlewares/auth.middelwares.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/add", upload.single("image"), addNewUser);
userRouter.put("/update", upload.single("image"), authenticate, updateUser);
userRouter.delete("/delete", deleteUser);
userRouter.get("/readOne", authenticate, getOneUser);
// userRouter.patch(
//   "/changeRole",
//   authenticate,
//   checkRoles(["admin"]),
//   changeRole
// );

export { userRouter };
