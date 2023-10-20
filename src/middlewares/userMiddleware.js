import { ObjectId } from "mongodb";
import userModel from "../models/userModel.js";
import { isStrong } from "../utils/helper.js";

//middleware to check if the username is available or already taken
export async function checkUsername(req, res, next) {
  const user = await userModel.findOne({ username: req.body.username });
  try {
    if (user) {
      res.json({ message: "Username is already in use, Try a different one!" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
// middleware to handle errors of password
export function checkPass(req, res, next) {
  const { password } = req.body;
  !password && res.status(500).json({ message: "Please add a password" });
  if (isStrong(password)) {
    next();
  } else {
    res.json({
      message:
        "Password should contain at least 8 characters, one uppercase, one lowercase, one digit, one special character",
    });
  }
}
// middleware to check the existance of user id when deleting or updating
export async function checkUserID(req, res, next) {
  const { userID } = req.body;
  if (!userID) {
    res.json({ message: "userID is not provided" });
  } else {
    try {
      await userModel.findOne({ _id: req.body.userID });
      next();
    } catch (error) {
      res.status(500).json({ message: "Bad request" });
    }
  }
}
export function updatePass(req, res, next) {
  const password = req.body.password;
  if (!password) {
    console.log("next");
    next();
  } else {
    isStrong(password)
      ? next()
      : res.json({
          message:
            "Password should contain at least 8 characters, one uppercase, one lowercase, one digit, one special character",
        });
  }
}
