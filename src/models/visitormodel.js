import mongoose from "mongoose";
// import dbConnect from './src/config/dbConnection';




const { Schema, model } = mongoose;

 const visitorSchema = new Schema({
  First_Name:{
    type:String,
    required:true
  },

  Last_Name:{
    type:String,
    required:true
  },

   Phone_Number:{
    type:Number,
    required:true
   },

   Email:{
    type:String,
    required:true
   },

   Message:{
    type:String,
    required:true
   }



 })

 const Visitor = model("Visitor", visitorSchema);

 export default Visitor;

 
 