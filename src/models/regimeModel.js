import { Schema, model } from "mongoose";

 
 const regimeSchema = new Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
    image: {
      data: Buffer,
      type: String,
    },
  category:{type:Schema.Types.ObjectId, ref:"Categories"}
 })
 export default model('Regime Plans', regimeSchema)