import { ObjectId } from "mongodb";
import userModel from "../models/userModel.js";
import { isStrong, isUsernameOk } from "../utils/helper.js";

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
// function to validate the user and check if it meats the username criteria
export function validateUsername(req, res, next) {
  const { username } = req.body;
  isUsernameOk(username)
    ? next()
    : res
        .status(500)
        .json({
          message:
            "username should consist of at least 8 characters, must include at least one number, with no special characters  ",
        });
}
// middleware to handle errors of password
export function validatePass(req, res, next) {
  const { password } = req.body;
  !password && res.status(500).json({ message: "Please add a password" });
  if (isStrong(password)) {
    next();
  } else {
    res.json({
      message:
        "Password should contain at least 6 characters, one uppercase, one lowercase, one digit, one special character",
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
// validate the password when updating
export function updatePass(req, res, next) {
  const password = req.body.password;
  if (!password) {
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
export async function signInUser(req,res,next){
  const {username} = req.body
  const targetUsername = await userModel.findOne({username: username})
  console.log(targetUsername)
  if(targetUsername){
    next()
  }else{
    res.status(404).json({message: 'Account not Found'})
  }
}
export async function signInPass(req,res,next){
  const {username, password} = req.body
  const targetUsername = await userModel.findOne({username: username})
  const isMatched = password === targetUsername.password
  if(isMatched){
    next()
  }else{
    res.status(404).json({message: 'Wrong Password'})
  }
}