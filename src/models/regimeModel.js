import { Schema, model } from "mongoose";

 
 const regimeSchema = new Schema({
    name:{type: String, required: true},
    description:{type: String, required: true},
 })
 export default model('Regime Plans', regimeSchema)