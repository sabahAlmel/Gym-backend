import userModel from "../models/userModel.js"
import { isStrong } from "../utils/helper.js"

//middleware to check if the username is available or already taken
export async function checkUsername(req,res,next){
   const user =  await userModel.findOne({username: req.body.username})
   try {
    if (user){
        res.json({message: 'Username is already in use, Try a different one!'})
    }else{
        next()
    }
   } catch (error) {
            console.log(error)
        }
         
    }
    // middleware to handle errors of password
    export function checkPass(req,res,next){
        const {password} = req.body
        !password && res.status(500).json({message: "Please add a password"})
        if(isStrong(password)){
            next()
        }else{
            res.json({message: "Password should contain at least 8 characters, one uppercase, one lowercase, one digit, one special character"}) 
        }
    }