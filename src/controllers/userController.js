import User from "../models/userModel.js" ;

export async function getUsers(req,res){
    try {
        const users = await User.find()
        res.json({users: users})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Bad Request! "})
    }
}
export async function addUser(req,res){
    const {username, password} = req.body
        const user = new User ({username: username, password: password})
        await user.save()
        res.json({message: "New User Have Been Added"})
}