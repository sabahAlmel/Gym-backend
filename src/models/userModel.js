import{ Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    sub_plan: String,
    isAdmin: Boolean
})

export default model('UserModel', userSchema)
