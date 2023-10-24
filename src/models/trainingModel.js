import { Schema, model } from "mongoose";

const trainingSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: {
    data: Buffer,
    type: String,
  },
});

export default model("Training", trainingSchema);
