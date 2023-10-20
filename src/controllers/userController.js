import userModel from "../models/userModel.js" ;

export async function getUsers(req,res){
    try {
        const users = await userModel.find()
        res.json({users: users})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Bad Request! "})
    }
}