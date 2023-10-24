import { Schema, model } from "mongoose";

const trainingSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
})

export default model('Training', trainingSchema)