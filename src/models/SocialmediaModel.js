import mongoose from "mongoose";
// import dbConnect from './src/config/dbConnection';




const { Schema, model } = mongoose;

 const SocialMediaSchema = new Schema({

    instagram: String,
    facebook: String ,
    whatsapp :String,
    youtube:String
 })

 const socialmedia= model("SocialMedia", SocialMediaSchema);

 export default socialmedia;

 
 